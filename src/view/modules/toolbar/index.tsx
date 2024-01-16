import {
  useState,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  FC,
} from 'react'
import { useTranslation } from 'react-i18next'
import isEqual from 'lodash.isequal'
import type { RadioChangeEvent } from 'antd'
import { Radio } from 'antd'
import {
  DragOutlined,
  SearchOutlined,
  AimOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { GameObject } from 'remiz'

import { EngineContext } from '../../providers'
import { Tool, ToolController } from '../../../engine/components'
import type { FeatureValue } from '../../../engine/components/tool'
import { EventType } from '../../../events'
import type { SelectLevelEvent } from '../../../events'

import { features } from './components'
import { ToolbarStyled, ToolGroupCSS } from './toolbar.style'

export const Toolbar: FC = () => {
  const { t } = useTranslation()
  const {
    scene,
    gameObjectObserver,
    gameStateObserver,
  } = useContext(EngineContext)

  const mainObjectId = useMemo<string>(
    () => (scene.context.data.mainObject as GameObject).id,
    [],
  )

  const [selectedTool, setSelectedTool] = useState('')
  const [toolFeatures, setToolFeatures] = useState<Record<string, FeatureValue>>({})
  const [disabled, setDisabled] = useState(true)

  const ToolFeatures = useMemo(() => features[selectedTool], [selectedTool])

  useEffect(() => {
    const handleSelectLevel = (event: SelectLevelEvent): void => {
      setDisabled(event.levelId === undefined)
    }

    const handleUpdate = (): void => {
      const mainObject = gameObjectObserver.getById(mainObjectId) as GameObject
      const toolController = mainObject.getComponent(ToolController)
      const toolObject = mainObject.getChildById(toolController.activeTool)

      if (!toolObject) {
        return
      }

      const {
        name,
        features: currentFeatures,
      } = toolObject.getComponent(Tool)

      if (name !== selectedTool) {
        setSelectedTool(name)
      }

      const featuresValues = Object.keys(currentFeatures).reduce((acc, key) => {
        acc[key] = currentFeatures[key].value
        return acc
      }, {} as Record<string, FeatureValue>)

      if (!isEqual(featuresValues, toolFeatures)) {
        setToolFeatures(featuresValues)
      }
    }

    scene.addEventListener(EventType.SelectLevel, handleSelectLevel)
    gameStateObserver.subscribe(handleUpdate)

    return () => {
      scene.removeEventListener(EventType.SelectLevel, handleSelectLevel)
      gameStateObserver.unsubscribe(handleUpdate)
    }
  }, [
    gameObjectObserver,
    gameStateObserver,
    mainObjectId,
    selectedTool,
    toolFeatures,
  ])

  const handleSelect = useCallback((event: RadioChangeEvent) => {
    scene.emit(EventType.SelectTool, {
      name: event.target.value as string,
    })
  }, [])

  return (
    <ToolbarStyled>
      <Radio.Group
        css={ToolGroupCSS}
        buttonStyle="solid"
        size="small"
        value={selectedTool}
        onChange={handleSelect}
        disabled={disabled}
      >
        <Radio.Button value="hand">
          <DragOutlined title={t('toolbar.hand.title')} />
        </Radio.Button>
        <Radio.Button value="pointer">
          <AimOutlined title={t('toolbar.pointer.title')} />
        </Radio.Button>
        <Radio.Button value="zoom">
          <SearchOutlined title={t('toolbar.zoom.title')} />
        </Radio.Button>
        <Radio.Button value="template">
          <UserOutlined title={t('toolbar.template.title')} />
        </Radio.Button>
      </Radio.Group>

      {features[selectedTool] && !disabled ? (<ToolFeatures features={toolFeatures} />) : null}
    </ToolbarStyled>
  )
}
