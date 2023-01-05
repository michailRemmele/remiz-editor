import {
  useContext,
  useCallback,
} from 'react'

import { EngineContext } from '../../providers'
import { COMMAND_MSG } from '../../../consts/message-types'

export interface Command {
  command: string
  options: unknown
}

export type UseCommanderHook = () => {
  dispatch: (command: Command) => void
}

export const useCommander: UseCommanderHook = () => {
  const { pushMessage } = useContext(EngineContext)

  const dispatch = useCallback((command: Command) => {
    pushMessage({
      type: COMMAND_MSG,
      ...command,
    })
  }, [pushMessage])

  return { dispatch }
}