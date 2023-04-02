import React, {
  useMemo,
  useContext,
  FC,
} from 'react'
import { useTranslation } from 'react-i18next'

import {
  Field,
  DependencyField,
  LabelledTextInput,
  LabelledCheckbox,
  LabelledNumberInput,
} from '../../../../../../../modules/inspector/components'
import { AnimationEditorContext } from '../../../providers'

export const SubstateInspector: FC = () => {
  const { t } = useTranslation()
  const {
    path,
    selectedState,
    selectedSubstate,
  } = useContext(AnimationEditorContext)
  const id = selectedSubstate as string

  const statePath = useMemo(
    () => path.concat('states', `id:${selectedState as string}`),
    [path, selectedState],
  )
  const substatePath = useMemo(
    () => statePath.concat('substates', `id:${id}`),
    [statePath, id],
  )

  const namePath = useMemo(() => substatePath.concat('name'), [substatePath])
  const loopedPath = useMemo(() => substatePath.concat('timeline', 'looped'), [substatePath])
  const xPath = useMemo(() => substatePath.concat('x'), [substatePath])
  const yPath = useMemo(() => substatePath.concat('y'), [substatePath])

  const pickModePath = useMemo(() => statePath.concat('pickMode'), [statePath])

  return (
    <form className="animation-inspector__form">
      <Field
        path={namePath}
        component={LabelledTextInput}
        label={t('components.animatable.editor.state.name.title')}
      />
      <Field
        path={loopedPath}
        component={LabelledCheckbox}
        label={t('components.animatable.editor.state.looped.title')}
      />
      <Field
        path={xPath}
        component={LabelledNumberInput}
        label={t('components.animatable.editor.substate.x.title')}
      />
      <DependencyField
        path={yPath}
        component={LabelledNumberInput}
        label={t('components.animatable.editor.substate.y.title')}
        dependencyPath={pickModePath}
        dependencyValue="2D"
      />
    </form>
  )
}
