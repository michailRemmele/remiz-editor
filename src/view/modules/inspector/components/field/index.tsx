import React, {
  useContext,
  useEffect,
  useCallback,
  useState,
  FC,
  HTMLProps,
} from 'react'

import { EngineContext } from '../../../../providers'
import { get, Data } from '../../../../utils/get'

interface FieldProps extends HTMLProps<HTMLElement> {
  path: Array<string>
  // comment: Allow to pass any component to Field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: FC<any>
  [key: string]: unknown
}

export const Field: FC<FieldProps> = ({ component, path, ...props }) => {
  const InputComponent = component

  const { sceneContext } = useContext(EngineContext)
  const projectConfig = sceneContext.data.projectConfig as Data

  const [value, setValue] = useState('')

  useEffect(() => setValue(get(projectConfig, path) as string), [path, projectConfig])

  const handleBlur = useCallback(() => {
    console.log(value)
  }, [value])

  const handleChange = useCallback((newValue: string) => {
    setValue(newValue)
  }, [])

  return (
    <InputComponent
      value={value}
      onBlur={handleBlur}
      onChange={handleChange}
      {...props}
    />
  )
}
