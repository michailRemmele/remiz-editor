import {
  ProjectLoader,
  LevelViewer,
  ToolManager,
  ZoomToolSystem,
  HandToolSystem,
  PointerToolSystem,
  TemplateToolSystem,
  Commander,
  ShapesRenderer,
  GridSystem,
  SettingsSystem,
} from './systems'

import {
  Tool,
  Shape,
  Settings,
} from './components'

export const editorSystems = {
  commander: Commander,
  projectLoader: ProjectLoader,
  levelViewer: LevelViewer,
  toolManager: ToolManager,
  zoomToolSystem: ZoomToolSystem,
  handToolSystem: HandToolSystem,
  pointerToolSystem: PointerToolSystem,
  templateToolSystem: TemplateToolSystem,
  shapesRenderer: ShapesRenderer,
  gridSystem: GridSystem,
  settingsSystem: SettingsSystem,
}

export const editorComponents = {
  tool: Tool,
  shape: Shape,
  settings: Settings,
}
