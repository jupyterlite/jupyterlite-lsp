import { WebSocket } from 'mock-socket';

import { ServerConnection } from '@jupyterlab/services';

import { JupyterLiteServer } from '@jupyterlite/server';

import { DEBUG, ILSPHacks } from './tokens';

function hackServerConnection(app: JupyterLiteServer) {
  const realMakeSettings = ServerConnection.makeSettings;

  function makeSettings(options?: Partial<ServerConnection.ISettings>) {
    const settings = realMakeSettings({
      ...(options || {}),
      fetch: app.fetch.bind(app),
    });
    DEBUG && console.debug('settings', settings);
    return settings;
  }

  ServerConnection.makeSettings = makeSettings;
}

function hoistMockSocket() {
  (window as any).MockWebSocket = WebSocket;
}

export function applyHacks(app: JupyterLiteServer): ILSPHacks {
  hackServerConnection(app);
  hoistMockSocket();
  return { hacked: true };
}
