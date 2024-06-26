import { useTranslation } from 'react-i18next'
import { Tabs } from 'antd'

import { TabsCSS } from '../../common-styles/tabs.style'

import { LevelsTree, TemplatesTree, ScenesList } from './components'
import { ExplorerStyled } from './explorer.style'

export const Explorer = (): JSX.Element => {
  const { t } = useTranslation()

  return (
    <ExplorerStyled>
      <Tabs css={TabsCSS} type="card">
        <Tabs.TabPane tab={t('explorer.tab.levels')} key="levels">
          <LevelsTree />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('explorer.tab.templates')} key="templates">
          <TemplatesTree />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('explorer.tab.scenes')} key="scenes">
          <ScenesList />
        </Tabs.TabPane>
        <Tabs.TabPane tab={t('explorer.tab.loaders')} key="loaders">
          <ScenesList isLoaders />
        </Tabs.TabPane>
      </Tabs>
    </ExplorerStyled>
  )
}
