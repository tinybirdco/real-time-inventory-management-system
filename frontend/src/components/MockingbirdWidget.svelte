<script>
  import { createTooltip } from '@melt-ui/svelte';
  import { createWorker, startWorker, stopWorker } from '../lib/workerBuilder';
  import { Pause, Play } from 'lucide-svelte';
  import { fade } from 'svelte/transition';

  /** @type {import('@tinybirdco/mockingbird').Schema} */
  const schema = {
    timestamp: {
      type: 'mockingbird.timestampNow'
    },
    product: {
      type: 'mockingbird.pick',
      params: [
        {
          values: [
            'sZzx0cUDX98',
            '5d0cgAl5BTk',
            'YY4YaHKh2jQ',
            'p8Drpg_duLw',
            'xFmXLq_KJxg',
            'fSdBxY0NxVI',
            '6cHumpSxTvs',
            'Zu7A1GCSjZE',
            'Fg15LdqpWrs'
          ]
        }
      ]
    },
    event: {
      type: 'mockingbird.pickWeighted',
      params: [
        {
          values: [
            'view',
            'cart',
            'sale'
          ],
          weights: [
            60,
            33,
            24
          ]
        }
      ]
    }
  };
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  const host = import.meta.env.VITE_TB_HOST;
  let worker = null;

  const pauseData = async () => {
    if (worker) {
      stopWorker(worker);
      worker = null;
    }
  };

  const generateData = async () => {
    const endpoint =
      host === 'api.tinybird.co' ? 'eu_gcp' : host === 'us-east.api.tinybird.co' ? 'us_gcp' : host;

    worker = createWorker({
      schema,
      endpoint,
      token: tbAppendToken,
      datasource: 'ecomm_events',
      eps: 500,
      limit: 100000
    });

    if (!worker) return;

    startWorker(worker);
  };
  const {
    elements: { trigger, content },
    states: { open }
  } = createTooltip({
    positioning: {
      placement: 'bottom'
    },
    openDelay: 0,
    closeDelay: 0,
    closeOnPointerDown: false,
    forceVisible: true
  });
</script>

{#if worker}
  <button
    class="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
    on:click={pauseData}
    use:melt={$trigger}
  >
    <Pause class="h-4 w-4" />
  </button>
{:else}
  <button
    class="relative flex h-8 w-8 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors dark:border-neutral-700 dark:text-white"
    on:click={generateData}
    use:melt={$trigger}
  >
    <Play class="h-4 w-4" />
  </button>
{/if}
{#if $open}
  <div use:melt={$content} class="z-50 rounded-lg bg-secondary shadow">
    <p class="px-4 py-1 text-white text-sm">
      {worker ? 'Pause data' : 'Generate data'}
    </p>
  </div>
{/if}
