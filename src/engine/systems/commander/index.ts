import type {
  MessageBus,
  System,
  SystemOptions,
} from 'remiz'

import {
  COMMAND_MSG,
  COMMAND_UNDO_MSG,
  COMMAND_CLEAN_MSG,
} from '../../../consts/message-types'
import type {
  CommandMessage,
  CommandUndoMessage,
  CommandCleanMessage,
} from '../../../types/messages'
import type { Store } from '../../../store'

import { commands } from './commands'
import { Command } from './commands/command'

const HISTORY_SIZE = 100

interface HistoryOperation {
  undo: () => void
}

export class Commander implements System {
  private messageBus: MessageBus
  private configStore: Store
  private commands: Record<string, Command>
  private history: Record<string, Array<HistoryOperation>>

  constructor(options: SystemOptions) {
    const {
      messageBus,
      sceneContext,
    } = options

    this.messageBus = messageBus
    this.configStore = sceneContext.data.configStore as Store
    this.commands = Object.keys(commands).reduce((acc: Record<string, Command>, key) => {
      const SomeCommand = commands[key]
      acc[key] = new SomeCommand(this.configStore)

      return acc
    }, {})
    this.history = {}
  }

  private handleCommandMessages(): void {
    const messages = this.messageBus.get(COMMAND_MSG) as Array<CommandMessage>
    if (!messages?.length) {
      return
    }

    messages.forEach(({ command, scope, options }) => {
      const cmd = this.commands[command]

      if (!cmd) {
        return
      }

      const undo = cmd.execute(options)
      if (undo === undefined) {
        return
      }

      this.history[scope] ??= []
      this.history[scope].push({ undo })

      if (this.history[scope].length > HISTORY_SIZE) {
        this.history[scope].shift()
      }
    })
  }

  private handleUndoMessages(): void {
    const undoMessages = this.messageBus.get(COMMAND_UNDO_MSG) as Array<CommandUndoMessage>
    if (!undoMessages?.length) {
      return
    }

    undoMessages.forEach(({ scope }) => {
      if (this.history[scope]?.length > 0) {
        const operation = this.history[scope].pop() as HistoryOperation
        operation.undo()
      }
    })
  }

  private handleCleanMessages(): void {
    const cleanMessages = this.messageBus.get(COMMAND_CLEAN_MSG) as Array<CommandCleanMessage>
    if (!cleanMessages?.length) {
      return
    }

    cleanMessages.forEach(({ scope }) => {
      delete this.history[scope]
    })
  }

  update(): void {
    this.handleCommandMessages()
    this.handleUndoMessages()
    this.handleCleanMessages()
  }
}
