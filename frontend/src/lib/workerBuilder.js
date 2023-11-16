/**
 *
 * @param {import('@tinybirdco/mockingbird').TinybirdConfig} config
 * @param {(message: MessageEvent<number>) =>void} onMessage
 * @param {(e: ErrorEvent) => void} onError
 */
export function createWorker(config, onMessage, onError) {
  if (!window.Worker) return undefined;

  const worker = new Worker(new URL('./worker.js', import.meta.url), {
    type: 'module'
  });

  if (onMessage) worker.onmessage = onMessage;
  if (onError) worker.onerror = onError;

  worker.postMessage({
    init: config.schema,
    config: config
  });

  return worker;
}

export function startWorker(worker) {
  worker.postMessage({});
}

export function stopWorker(worker) {
  worker.terminate();
}
