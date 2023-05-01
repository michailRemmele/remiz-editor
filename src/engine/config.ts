import type { Config } from 'remiz'

import { SHAPE_CANVAS_ROOT } from '../consts/root-nodes'

export const editorConfig: Config = {
  scenes: [
    {
      id: '0481caa3-c28c-40cc-a1f8-0f2496f1c403',
      name: 'editor',
      levelId: 'cd42a993-f3c0-4921-b867-108c81028a26',
      systems: [
        {
          name: 'keyboardInputSystem',
          options: {},
        },
        {
          name: 'mouseInputSystem',
          options: {
            windowNodeId: 'canvas-root',
          },
        },
        {
          name: 'mouseInputCoordinatesProjector',
          options: {},
        },
        {
          name: 'keyboardControlSystem',
          options: {},
        },
        {
          name: 'mouseControlSystem',
          options: {},
        },
        {
          name: 'projectLoader',
          options: {},
        },
        {
          name: 'levelViewer',
          options: {
            mainObjectId: 'main-object',
          },
        },
        {
          name: 'commander',
          options: {},
        },
        {
          name: 'toolManager',
          options: {},
        },
        {
          name: 'zoomToolSystem',
          options: {},
        },
        {
          name: 'handToolSystem',
          options: {},
        },
        {
          name: 'pointerToolSystem',
          options: {},
        },
        {
          name: 'cameraSystem',
          options: {
            windowNodeId: 'canvas-root',
            initialCamera: 'main-object',
            scaleSensitivity: 0.5,
          },
        },
        {
          name: 'uiBridge',
          options: {
            filterComponents: [],
          },
        },
        {
          name: 'renderer',
          options: {
            windowNodeId: 'canvas-root',
            backgroundColor: '#fafafa',
            sortingLayers: [
              'default',
              'background',
              'space',
              'terrain',
              'decorations',
              'lights',
              'effectsBack',
              'units',
              'editor',
            ],
          },
        },
        {
          name: 'shapesRenderer',
          options: {
            windowNodeId: SHAPE_CANVAS_ROOT,
          },
        },
      ],
    },
  ],
  levels: [
    {
      id: 'cd42a993-f3c0-4921-b867-108c81028a26',
      name: 'level-viewer',
      gameObjects: [
        {
          id: 'main-object',
          name: 'mainCamera',
          children: [],
          components: [
            {
              name: 'transform',
              config: {
                offsetX: 0,
                offsetY: 0,
                offsetZ: 1,
                rotation: 0,
              },
            },
            {
              name: 'camera',
              config: {
                zoom: 1,
              },
            },
          ],
        },
      ],
    },
  ],
  templates: [
    {
      id: 'hand',
      name: 'hand',
      type: 'tool',
      children: [],
      components: [
        {
          name: 'tool',
          config: {
            name: 'hand',
            features: {},
          },
        },
        {
          name: 'mouseControl',
          config: {
            inputEventBindings: [
              {
                event: 'MOUSE_LEFT_BUTTON_PRESS',
                messageType: 'CAMERA_MOVE_START',
                attrs: [],
              },
              {
                event: 'MOUSE_LEFT_BUTTON_RELEASE',
                messageType: 'CAMERA_MOVE_END',
                attrs: [],
              },
              {
                event: 'MOUSE_MOVE',
                messageType: 'CAMERA_MOVE',
                attrs: [],
              },
              {
                event: 'MOUSE_LEAVE',
                messageType: 'CAMERA_MOVE_END',
                attrs: [],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'zoom',
      name: 'zoom',
      type: 'tool',
      children: [],
      components: [
        {
          name: 'tool',
          config: {
            name: 'zoom',
            features: {
              direction: {
                value: 'in',
              },
            },
          },
        },
        {
          name: 'mouseControl',
          config: {
            inputEventBindings: [
              {
                event: 'MOUSE_LEFT_BUTTON_PRESS',
                messageType: 'CAMERA_ZOOM',
                attrs: [],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'pointer',
      name: 'pointer',
      type: 'tool',
      children: [],
      components: [
        {
          name: 'tool',
          config: {
            name: 'pointer',
            features: {},
          },
        },
        {
          name: 'mouseControl',
          config: {
            inputEventBindings: [
              {
                event: 'MOUSE_LEFT_BUTTON_CLICK',
                messageType: 'SELECT_GAME_OBJECT',
                attrs: [],
              },
            ],
          },
        },
      ],
    },
    {
      id: 'frame',
      name: 'frame',
      type: 'tool',
      children: [],
      components: [
        {
          name: 'transform',
          config: {
            offsetX: 0,
            offsetY: 0,
            offsetZ: 0,
            rotation: 0,
          },
        },
        {
          name: 'shape',
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
  startSceneId: '0481caa3-c28c-40cc-a1f8-0f2496f1c403',
}
