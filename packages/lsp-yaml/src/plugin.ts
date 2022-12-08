import { DEBUG, ILanguageServers } from '@jupyterlite/lsp';
import { JupyterLiteServer, JupyterLiteServerPlugin } from '@jupyterlite/server';

import { SERVER_PLUGIN_ID, SPEC } from './tokens';

const plugin: JupyterLiteServerPlugin<void> = {
  id: SERVER_PLUGIN_ID,
  autoStart: true,
  requires: [ILanguageServers],
  activate: (app: JupyterLiteServer, lsp: ILanguageServers) => {
    DEBUG && console.info(lsp);
    lsp.addLanguageServer('json', {
      spec: SPEC,
      createNewServer: async () => {
        const { JSONLanguageServer } = await import('./server');
        return new JSONLanguageServer();
      },
    });
  },
};

export default [plugin];
