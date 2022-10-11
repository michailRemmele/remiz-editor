import { SceneForm } from './scene-form'
import { LevelForm } from './level-form'

import type { FormComponentProps, FormComponent } from './types'

export type { FormComponentProps, FormComponent }

export const forms: Record<string, FormComponent> = {
  scene: SceneForm,
  level: LevelForm,
}
