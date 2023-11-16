import { TinybirdGenerator } from '@tinybirdco/mockingbird';

/** @type {import('@tinybirdco/mockingbird').MockingbirdGenerator} */
let generator = null;

onmessage = async function (e) {
  if ('init' in e.data) {
    if ('config' in e.data) generator = new TinybirdGenerator(e.data.config);
    else console.error('No config supplied to worker');
  } else {
    await generator.generate((data) => self.postMessage(data.length));
  }
};
