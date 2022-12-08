import {
  JupyterLiteServer,
  JupyterLiteServerPlugin,
  Router,
} from '@jupyterlite/server';

import { applyHacks } from './hacks';
import { LanguageServers } from './servers';
import {
  DEBUG,
  HACKS_PLUGIN_ID,
  ILSPHacks,
  ILanguageServers,
  ROUTES_PLUGIN_ID,
  SERVER_PLUGIN_ID,
} from './tokens';

const hacksPlugin: JupyterLiteServerPlugin<ILSPHacks> = {
  id: HACKS_PLUGIN_ID,
  provides: ILSPHacks,
  autoStart: true,
  activate: (app: JupyterLiteServer): ILSPHacks => {
    return applyHacks(app);
  },
};

const serverPlugin: JupyterLiteServerPlugin<ILanguageServers> = {
  id: SERVER_PLUGIN_ID,
  provides: ILanguageServers,
  autoStart: true,
  activate: (app: JupyterLiteServer) => {
    const server = new LanguageServers();
    return server;
  },
};

const routesPlugin: JupyterLiteServerPlugin<void> = {
  id: ROUTES_PLUGIN_ID,
  autoStart: true,
  requires: [ILanguageServers],
  activate: (app: JupyterLiteServer, lsp: ILanguageServers) => {
    app.router.get('/lsp/status', async (req: Router.IRequest, filename: string) => {
      const res = await lsp.status();
      DEBUG && console.debug('status', res);
      return new Response(JSON.stringify(res));
    });
  },
};

export default [hacksPlugin, serverPlugin, routesPlugin];
