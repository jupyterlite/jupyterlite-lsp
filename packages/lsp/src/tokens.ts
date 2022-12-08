import type * as SCHEMA from '@krassowski/jupyterlab-lsp/lib/_schema';

import { Token } from '@lumino/coreutils';

import { PageConfig } from '@jupyterlab/coreutils';

import * as _PACKAGE from '../package.json';

export const PACKAGE = _PACKAGE;
export const NS = PACKAGE.name;
export const VERSION = PACKAGE.version;
export const HACKS_PLUGIN_ID = `${NS}:hacks`;
export const SERVER_PLUGIN_ID = `${NS}:plugin`;
export const ROUTES_PLUGIN_ID = `${NS}:routes`;

export const ILanguageServers = new Token<ILanguageServers>(`${NS}:ILSPServer`);

export interface ILanguageServers {
  addLanguageServer(id: string, options: IAddServerOptions): void;
  status(): Promise<SCHEMA.ServersResponse>;
}

export const ILSPHacks = new Token<ILSPHacks>(`${NS}:ILSPHacks`);

export interface ILSPHacks {
  //
}

export interface IAddServerOptions {
  spec: SCHEMA.LanguageServerSpec;
  createNewServer: IServerFactory;
}

export interface IServerFactory {
  (): Promise<IJSONRPCLanguageServer>;
}

export interface IJSONRPCLanguageServer {
  initialize(): Promise<void>;
  write(msg: string | ArrayBuffer | Blob | ArrayBufferView): Promise<void>;
  read(): AsyncGenerator<string>;
}

export const DEBUG = window.location.href.includes('LSP_LITE_DEBUG');

export const WS_BASE_URL = PageConfig.getBaseUrl().replace(/^http/, 'ws');
