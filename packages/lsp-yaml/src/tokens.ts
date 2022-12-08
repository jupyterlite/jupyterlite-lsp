import type * as SCHEMA from '@krassowski/jupyterlab-lsp/lib/_schema';

import * as _PACKAGE from '../package.json';

export const PACKAGE = _PACKAGE;
export const NS = PACKAGE.name;
export const VERSION = PACKAGE.version;
export const SERVER_PLUGIN_ID = `${NS}:plugin`;

export const SPEC: SCHEMA.ServerSpecProperties = {
  display_name: 'YAML',
  languages: ['yaml', 'json'],
  mime_types: ['text/x-yaml', 'text/yaml', 'application/json'],
  version: 2,
};
