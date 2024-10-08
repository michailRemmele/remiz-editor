import { SET } from '../../../command-types'
import type { Command } from '../../hooks/use-commander'

export const setValue = (
  path: Array<string>,
  value: unknown,
  isEffect?: boolean,
): Command => ({
  command: SET,
  options: {
    path,
    value,
  },
  isEffect,
})
