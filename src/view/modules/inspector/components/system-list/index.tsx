import React, { useContext, useMemo, FC } from 'react'
import { useTranslation } from 'react-i18next'
import type { SceneConfig } from 'remiz'

import { EntityList } from '../entity-list'
import { EngineContext, SelectedEntityContext } from '../../../../providers'
import { get, Data } from '../../../../utils/get'

import { SystemForm } from './system-form'

export const SystemList: FC = () => {
  const { t } = useTranslation()

  const { path = [] } = useContext(SelectedEntityContext)
  const { sceneContext } = useContext(EngineContext)

  const projectConfig = sceneContext.data.projectConfig as Data
  const projectSystems = sceneContext.data.projectSystems as Record<string, unknown>

  const { systems } = get(projectConfig, path) as SceneConfig

  const availableSystems = useMemo(() => {
    const addedSystemsMap = systems.reduce((acc, system) => {
      acc[system.name] = true
      return acc
    }, {} as Record<string, boolean | undefined>)

    return Object.keys(projectSystems)
      .filter((key: string) => !addedSystemsMap[key])
      .map((key: string) => ({ label: key, value: key }))
  }, [systems])

  return (
    <EntityList
      entities={systems}
      component={SystemForm}
      options={availableSystems}
      placeholder={t('inspector.systemList.addNew.button.title')}
    />
  )
}
