import type * as SCHEMA from '@krassowski/jupyterlab-lsp/lib/_schema';

import { Session } from './session';
import { DEBUG, IAddServerOptions, ILanguageServers } from './tokens';

export class LanguageServers implements ILanguageServers {
  _specs = new Map<string, SCHEMA.LanguageServerSpec>();
  _sessions = new Map<string, Session>();

  addLanguageServer(id: string, options: IAddServerOptions): void {
    this._specs.set(id, options.spec);
    this._sessions.set(id, new Session(id, options));
  }

  async status(): Promise<SCHEMA.ServersResponse> {
    const response: SCHEMA.ServersResponse = { version: 2, sessions: {}, specs: {} };

    for (const [id, session] of this._sessions.entries()) {
      response.sessions[id] = session.toJSON();
    }

    for (const [id, spec] of this._specs.entries()) {
      response.specs![id] = spec;
    }
    DEBUG && console.debug('status!', this);

    return response;
  }
}
