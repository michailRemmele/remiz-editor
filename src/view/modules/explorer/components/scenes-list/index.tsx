import React, {
  useContext,
  useMemo,
  useCallback,
  FC,
} from 'react'
import { Tree } from 'antd'
import type { EventDataNode } from 'antd/lib/tree'
import type { Config } from 'remiz'

import { EngineContext, SelectedEntityContext } from '../../../../providers'
import { INSPECT_ENTITY_MSG } from '../../../../../consts/message-types'
import type { DataNodeWithPath, SelectFn } from '../../../../../types/tree-node'

import { parseScenes, getKey } from './utils'

export const ScenesList: FC = () => {
  const { sceneContext, pushMessage } = useContext(EngineContext)
  const {
    entity: selectedEntity,
    path: selectedEntityPath,
  } = useContext(SelectedEntityContext)

  const { scenes } = sceneContext.data.projectConfig as Config

  const treeData = useMemo(() => parseScenes(scenes), [scenes])

  const handleSelect = useCallback<SelectFn>((keys, { node }) => {
    if (node.selected) {
      return
    }

    pushMessage({
      type: INSPECT_ENTITY_MSG,
      path: (node as EventDataNode<DataNodeWithPath>).path.slice(0),
    })
  }, [pushMessage])

  const selectedKey = getKey(selectedEntity, selectedEntityPath)

  return (
    <Tree.DirectoryTree
      selectedKeys={selectedKey ? [selectedKey] : []}
      onSelect={handleSelect}
      treeData={treeData}
    />
  )
}