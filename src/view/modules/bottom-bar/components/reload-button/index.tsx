import {
  useCallback,
  useContext,
  FC,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Tooltip } from 'antd'
import { WarningOutlined } from '@ant-design/icons'

import { useSaveProject } from '../../../../hooks/use-save-project'
import { NeedsReloadContext } from '../../../../providers'

import { ReloadButtonStyled, IconCSS } from './reload-button.style'

export const ReloadButton: FC = () => {
  const { t } = useTranslation()
  const { needsReload } = useContext(NeedsReloadContext)
  const { save } = useSaveProject()

  const handleClick = useCallback(() => {
    save()
    window.location.reload()
  }, [])

  if (!needsReload) {
    return null
  }

  return (
    <Tooltip title={t('bottomBar.reloadWarning.button.tooltip')}>
      <ReloadButtonStyled onClick={handleClick}>
        <WarningOutlined css={IconCSS} />
        {t('bottomBar.reloadWarning.button.title')}
      </ReloadButtonStyled>
    </Tooltip>
  )
}
