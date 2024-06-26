import { forwardRef } from 'react'
import { HolderOutlined } from '@ant-design/icons'

import {
  DragOverlayStyled,
  HolderOutlinedCSS,
} from './entity-list.style'
import { EntityPanel } from './entity-panel'
import type { EntityPanelProps } from './entity-panel'

export const DragOverlayEntity = forwardRef<HTMLDivElement, EntityPanelProps>((props, ref) => (
  <DragOverlayStyled ref={ref}>
    <EntityPanel
      expandExtra={<HolderOutlined css={HolderOutlinedCSS} />}
      {...props}
    />
  </DragOverlayStyled>
))
