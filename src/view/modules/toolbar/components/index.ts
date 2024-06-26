import type { FC } from 'react'
import { ZoomFeatures } from './zoom-features'
import { TemplateFeatures } from './template-features'
import { PointerFeatures } from './pointer-features'

import type { ToolFeaturesProps } from './types'

export const features: Record<string, FC<ToolFeaturesProps>> = {
  zoom: ZoomFeatures,
  pointer: PointerFeatures,
  template: TemplateFeatures,
}
