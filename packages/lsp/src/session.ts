import type * as SCHEMA from '@krassowski/jupyterlab-lsp/lib/_schema';
import { Client as WebSocketClient, Server as WebSocketServer } from 'mock-socket';

import {
  DEBUG,
  IAddServerOptions,
  IJSONRPCLanguageServer,
  WS_BASE_URL,
} from './tokens';

export class Session {
  private _id: string;
  private _handlerCount = 0;
  private _wsClient: WebSocketClient | null = null;
  private _options: IAddServerOptions;
  private _langServer: IJSONRPCLanguageServer | null = null;

  constructor(id: string, options: IAddServerOptions) {
    this._id = id;
    this._options = options;
    void this.initServer();
  }

  get url() {
    return `${WS_BASE_URL}lsp/ws/${this._id}`;
  }

  async initServer() {
    const wsServer = new WebSocketServer(this.url);

    wsServer.on('connection', async (socket: WebSocketClient) => {
      this._wsClient = socket;
      const _langServer = (this._langServer = await this._options.createNewServer());
      await _langServer.initialize();
      socket.on('message', this.onMessage);
      DEBUG && console.error('connected', this._wsClient);
      void this.read(_langServer, socket);
    });

    wsServer.on('close', (): void => {
      console.error('closed');
    });
  }

  async read(langServer: IJSONRPCLanguageServer, socket: WebSocketClient) {
    for await (const msg of langServer.read()) {
      socket.send(msg);
    }
  }

  onMessage = async (
    msg: string | ArrayBuffer | Blob | ArrayBufferView
  ): Promise<void> => {
    this._langServer?.write(msg);
  };

  get spec() {
    return this._options.spec;
  }

  toJSON(): SCHEMA.LanguageServerSession {
    return {
      handler_count: this._handlerCount,
      last_handler_message_at: '',
      status: 'not_started',
      last_server_message_at: '',
      spec: this._options.spec,
    };
  }
}

export namespace Session {
  export interface IOptions {
    spec: SCHEMA.LanguageServerSpec;
  }
}
