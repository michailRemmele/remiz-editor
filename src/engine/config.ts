import type { Config, GlobalOption } from 'remiz'

import { SHAPE_CANVAS_ROOT } from '../consts/root-nodes'
import {
  HAND_TOOL,
  POINTER_TOOL,
  ZOOM_TOOL,
  TEMPLATE_TOOL,
} from '../consts/tools'
import { EventType } from '../events'

interface EditorConfigOptions {
  globalOptions: Array<GlobalOption>
}

export const getEditorConfig = ({
  globalOptions,
}: EditorConfigOptions): Config => ({
  scenes: [
    {
      id: '0481caa3-c28c-40cc-a1f8-0f2496f1c403',
      name: 'editor',
      levelId: 'cd42a993-f3c0-4921-b867-108c81028a26',
      systems: [
        {
          name: 'CameraSystem',
          options: {
            windowNodeId: 'canvas-root',
            initialCamera: 'main-actor',
            scaleSensitivity: 0.5,
          },
        },
        {
          name: 'MouseInputSystem',
          options: {
            windowNodeId: 'canvas-root',
            useWindow: false,
          },
        },
        {
          name: 'MouseControlSystem',
          options: {},
        },
        {
          name: 'ProjectLoader',
          options: {},
        },
        {
          name: 'LevelViewer',
          options: {
            mainActorId: 'main-actor',
          },
        },
        {
          name: 'SettingsSystem',
          options: {},
        },
        {
          name: 'ToolManager',
          options: {},
        },
        {
          name: 'ZoomToolSystem',
          options: {},
        },
        {
          name: 'HandToolSystem',
          options: {},
        },
        {
          name: 'PointerToolSystem',
          options: {},
        },
        {
          name: 'TemplateToolSystem',
          options: {},
        },
        {
          name: 'Commander',
          options: {},
        },
        {
          name: 'UiBridge',
          options: {
            filterComponents: [],
          },
        },
        {
          name: 'SpriteRenderer',
          options: {
            windowNodeId: 'canvas-root',
            backgroundColor: '#ffffff',
            backgroundAlpha: 0,
          },
        },
        {
          name: 'ShapesRenderer',
          options: {
            windowNodeId: SHAPE_CANVAS_ROOT,
          },
        },
        {
          name: 'GridSystem',
          options: {},
        },
      ],
    },
  ],
  levels: [
    {
      id: 'cd42a993-f3c0-4921-b867-108c81028a26',
      name: 'level-viewer',
      actors: [
        {
          id: 'main-actor',
          name: 'mainCamera',
          children: [
            {
              id: HAND_TOOL,
              name: HAND_TOOL,
              children: [],
              components: [
                {
                  name: 'Tool',
                  config: {
                    name: 'hand',
                    features: {},
                    inputBindings: [
                      {
                        id: '0ea69440-f648-4774-b62e-c2e5b95d04ca',
                        event: 'mousedown',
                        button: 0,
                        eventType: EventType.CameraMoveStart,
                        attrs: [],
                      },
                      {
                        id: '2769eec3-aa64-4b71-a0cc-d81e7c8d686c',
                        event: 'mouseup',
                        button: 0,
                        eventType: EventType.CameraMoveEnd,
                        attrs: [],
                      },
                      {
                        id: '2a9351cd-2257-4c4d-a84e-3e8020ad14a3',
                        event: 'mousemove',
                        eventType: EventType.CameraMove,
                        attrs: [],
                      },
                      {
                        id: '4a5da295-9621-41d4-8b88-77d3d8a0316e',
                        event: 'mouseleave',
                        eventType: EventType.CameraMoveEnd,
                        attrs: [],
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: ZOOM_TOOL,
              name: ZOOM_TOOL,
              children: [],
              components: [
                {
                  name: 'Tool',
                  config: {
                    name: 'zoom',
                    features: {
                      direction: {
                        value: 'in',
                        withClassName: true,
                      },
                    },
                    inputBindings: [
                      {
                        id: 'f908d5e8-448b-420f-a417-9e2f17b20d0c',
                        event: 'mousedown',
                        button: 0,
                        eventType: EventType.CameraZoom,
                        attrs: [],
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: POINTER_TOOL,
              name: POINTER_TOOL,
              children: [],
              components: [
                {
                  name: 'Tool',
                  config: {
                    name: 'pointer',
                    features: {
                      grid: {
                        value: false,
                        withClassName: false,
                      },
                    },
                    inputBindings: [
                      {
                        id: '2180969a-b549-47de-ab14-1677378112bf',
                        event: 'mousedown',
                        button: 0,
                        eventType: EventType.SelectionMoveStart,
                        attrs: [],
                      },
                      {
                        id: '3ef9cf69-240e-4b1a-823a-4b58fd34d80f',
                        event: 'mousemove',
                        eventType: EventType.SelectionMove,
                        attrs: [],
                      },
                      {
                        id: '99b59ce8-e433-4749-bcea-8a0d5d1d7605',
                        event: 'mouseup',
                        button: 0,
                        eventType: EventType.SelectionMoveEnd,
                        attrs: [],
                      },
                      {
                        id: '762e02df-24c5-4921-9d6c-5bea83a982cc',
                        event: 'mouseleave',
                        eventType: EventType.SelectionMoveEnd,
                        attrs: [],
                      },
                    ],
                  },
                },
              ],
            },
            {
              id: TEMPLATE_TOOL,
              name: TEMPLATE_TOOL,
              children: [],
              components: [
                {
                  name: 'Tool',
                  config: {
                    name: 'template',
                    features: {
                      preview: {
                        value: true,
                        withClassName: false,
                      },
                      grid: {
                        value: false,
                        withClassName: false,
                      },
                      templateId: {
                        value: undefined,
                        withClassName: false,
                      },
                    },
                    inputBindings: [
                      {
                        id: '2789da3d-7adf-4f63-9af3-513c75650066',
                        event: 'click',
                        eventType: EventType.AddFromTemplate,
                        attrs: [],
                      },
                    ],
                  },
                },
              ],
            },
          ],
          components: [
            {
              name: 'Transform',
              config: {
                offsetX: 0,
                offsetY: 0,
                offsetZ: 1,
                rotation: 0,
              },
            },
            {
              name: 'Camera',
              config: {
                zoom: 1,
              },
            },
            {
              name: 'MouseControl',
              config: {
                inputEventBindings: [
                  {
                    id: 'cd331a89-e99f-4d70-a8bc-8c794632e9a1',
                    event: 'mousemove',
                    eventType: EventType.ToolCursorMove,
                    attrs: [],
                  },
                  {
                    id: '6abde95f-5b2b-4066-9ef3-7af0559e155a',
                    event: 'mouseleave',
                    eventType: EventType.ToolCursorLeave,
                    attrs: [],
                  },
                ],
              },
            },
            {
              name: 'ToolController',
              config: {
                activeTool: HAND_TOOL,
              },
            },
            {
              name: 'Settings',
              config: {
                showGrid: false,
                gridStep: 16,
                gridColor: '#1890FF',
              },
            },
          ],
        },
      ],
    },
  ],
  templates: [
    {
      id: 'frame',
      name: 'frame',
      children: [],
      components: [
        {
          name: 'Transform',
          config: {
            offsetX: 0,
            offsetY: 0,
            offsetZ: 0,
            rotation: 0,
          },
        },
        {
          name: 'Shape',
          config: {
            type: 'rectangle',
            properties: {
              width: 0,
              height: 0,
              color: 'rgba(0, 0, 0, 0)',
              strokeWidth: 2,
              strokeColor: '#fff',
            },
          },
        },
      ],
    },
  ],
  loaders: [],
  globalOptions: [
    ...globalOptions,
  ],
  startSceneId: '0481caa3-c28c-40cc-a1f8-0f2496f1c403',
  startLoaderId: null,
})
