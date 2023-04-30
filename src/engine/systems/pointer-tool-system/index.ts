import type {
  System,
  SystemOptions,
  MessageBus,
  Message,
  SceneContext,
  GameObject,
  GameObjectSpawner,
  GameObjectDestroyer,
  GameObjectObserver,
  Transform,
  Renderable,
} from 'remiz'
import { RendererService } from 'remiz'

import {
  SELECT_GAME_OBJECT,
  INSPECT_ENTITY_MSG,
  SELECT_LEVEL_MSG,
} from '../../../consts/message-types'
import type {
  SelectLevelMessage,
  InspectEntityMessage,
} from '../../../types/messages'

import { buildGameObjectPath } from './utils'

const LEVEL_PATH_LEGTH = 2

interface MouseInputMessage extends Message {
  screenX: number
  screenY: number
}

export class PointerToolSystem implements System {
  private messageBus: MessageBus
  private sceneContext: SceneContext
  private gameObjectSpawner: GameObjectSpawner
  private gameObjectDestroyer: GameObjectDestroyer
  private gameObjectObserver: GameObjectObserver
  private selectedLevelId?: string

  private mainObject: GameObject

  private selectedObjectId?: string
  private frame?: GameObject

  constructor(options: SystemOptions) {
    const {
      messageBus,
      sceneContext,
      gameObjectSpawner,
      gameObjectDestroyer,
      createGameObjectObserver,
    } = options

    this.messageBus = messageBus
    this.sceneContext = sceneContext
    this.gameObjectSpawner = gameObjectSpawner
    this.gameObjectDestroyer = gameObjectDestroyer
    this.gameObjectObserver = createGameObjectObserver({
      components: ['transform', 'renderable'],
    })

    this.mainObject = sceneContext.data.mainObject as GameObject
  }

  private handleLevelChange(): void {
    const messages = this.messageBus.get(SELECT_LEVEL_MSG) as Array<SelectLevelMessage> | undefined

    if (!messages) {
      return
    }

    const { levelId } = messages[0]

    this.selectedLevelId = levelId
  }

  private handleInspectEntityMessages(): void {
    const inspectMessages = (this.messageBus.get(INSPECT_ENTITY_MSG) || [])
    if (!inspectMessages.length) {
      return
    }

    const { path } = inspectMessages.at(-1) as InspectEntityMessage

    if (path !== undefined && path[0] === 'levels' && path.length > LEVEL_PATH_LEGTH) {
      this.selectedObjectId = path.at(-1)?.split(':').at(-1)
    } else {
      this.selectedObjectId = undefined
    }
  }

  private handleSelectionMessages(): void {
    if (this.selectedLevelId === undefined) {
      return
    }

    const selectionMessages = (this.messageBus.get(SELECT_GAME_OBJECT) || [])
    if (!selectionMessages.length) {
      return
    }

    const {
      screenX,
      screenY,
    } = selectionMessages.at(-1) as MouseInputMessage

    const rendererService = this.sceneContext.getService(RendererService)

    const selectedObject = rendererService
      .intersectsWithPoint(screenX, screenY)
      .find((gameObject) => gameObject.getAncestor().id !== this.mainObject.id)

    this.messageBus.send({
      type: INSPECT_ENTITY_MSG,
      path: selectedObject !== undefined
        ? buildGameObjectPath(selectedObject, this.selectedLevelId)
        : undefined,
    })

    this.selectedObjectId = selectedObject?.id
  }

  private updateFrame(): void {
    if (this.frame === undefined && this.selectedObjectId !== undefined) {
      this.frame = this.gameObjectSpawner.spawn('frame')
      this.mainObject.appendChild(this.frame)
    }

    if (this.frame !== undefined && this.selectedObjectId === undefined) {
      this.gameObjectDestroyer.destroy(this.frame)
      this.frame = undefined
      return
    }

    if (this.frame === undefined || this.selectedObjectId === undefined) {
      return
    }

    const selectedObject = this.gameObjectObserver.getById(this.selectedObjectId)

    if (selectedObject === undefined) {
      return
    }

    const { width, height } = selectedObject.getComponent('renderable') as Renderable
    const { offsetX, offsetY } = selectedObject.getComponent('transform') as Transform

    const frameTransform = this.frame.getComponent('transform') as Transform

    frameTransform.offsetX = offsetX
    frameTransform.offsetY = offsetY
    frameTransform.scaleX = width
    frameTransform.scaleY = height
  }

  update(): void {
    this.handleLevelChange()
    this.handleInspectEntityMessages()
    this.handleSelectionMessages()

    this.updateFrame()
  }
}