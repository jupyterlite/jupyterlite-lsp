import type WaitQueue from 'wait-queue';

import { DEBUG, IJSONRPCLanguageServer } from '@jupyterlite/lsp';

export class JSONLanguageServer implements IJSONRPCLanguageServer {
  private _worker: Worker | null = null;
  private _readQueue: WaitQueue<any> | null = null;

  async initialize(): Promise<void> {
    const { default: WaitQueue } = await import('wait-queue');
    this._readQueue = new WaitQueue();
    this._worker = new Worker(
      new URL('yaml-language-server/lib/esm/webworker/yamlServerMain', import.meta.url)
    );
    DEBUG && console.info(this._worker);
    this._worker.onmessage = this.onWorkerMessage;
  }

  onWorkerMessage(msg: MessageEvent) {
    DEBUG && console.error('from worker', msg);
    this._readQueue?.unshift(msg.data);
  }

  async *read(): AsyncGenerator<string> {
    let msg: any;
    while (this._worker) {
      msg = await this._readQueue?.pop();
      DEBUG && console.error('yielding', msg);
      yield msg;
    }
  }

  async write(msg: string) {
    DEBUG && console.error('writing', msg);
    this._worker?.postMessage(msg);
  }
}
