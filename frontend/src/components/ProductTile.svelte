<script>
  import { sendEvents } from '../utils/tb.js';
  const tbAppendToken = import.meta.env.VITE_TB_APPEND_TOKEN;
  export let product;
  export let priority = 'lazy';

  import { createTooltip, melt } from '@melt-ui/svelte';
  import { fade } from 'svelte/transition';
  import { CreditCard } from 'lucide-svelte';
  import { StockStatus } from '../utils/filters.js';

  let buyedCount = 0;
  const {
    elements: { trigger, content },
    states: { open }
  } = createTooltip({
    positioning: {
      placement: 'top'
    },
    openDelay: 0,
    closeDelay: 0,
    closeOnPointerDown: false,
    forceVisible: true
  });
</script>

<li data-test="grid-tile" class="group overflow-hidden flex flex-col md:col-span-1">
  <div class="relative rounded-lg overflow-hidden aspect-[3/4]">
    <img
      alt={product.name}
      class={`duration-300 ease-in-out group-hover:scale-105 md:group-hover:rounded-xl md:transition-all md:duration-500 block absolute h-full w-full object-cover bg-white ${
        product.stock_status === StockStatus.outOfStock ? 'opacity-30' : ''
      }`}
      fetchpriority={priority === 'eager' ? 'high' : 'low'}
      decoding="async"
      loading={priority}
      src={product.photo}
    />
    <div class="absolute top-2 left-2">
      {#if !!product.rank_status}
        <div
          class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10"
        >
          {product.rank_status}
        </div>
      {/if}
      {#if product.stock_status === StockStatus.onlyLeft}
        <div
          class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
        >
          {`Only ${product.stock} left!`}
        </div>
      {/if}
      {#if product.stock_status === StockStatus.outOfStock}
        <div
          class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
        >
          Out of stock!
        </div>
      {/if}
    </div>
    {#if product.stock_status !== StockStatus.outOfStock}
      <div class="absolute bottom-2 right-2 flex items-center">
        <button
          class="rounded-full bg-secondary p-1.5 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary"
          use:melt={$trigger}
          aria-label="Buy"
          on:click={() => {
            sendEvents([{ product: product.id, event: 'sale' }], 'ecomm_events', tbAppendToken);
            buyedCount++;
          }}
          on:pointerleave={() => {
            setTimeout(() => {
              buyedCount = 0;
            }, 200);
          }}
        >
          <CreditCard class="h-4 w-4" />
        </button>
        {#if $open}
          <div
            use:melt={$content}
            transition:fade={{ duration: 100 }}
            class="z-50 rounded-lg bg-secondary shadow"
          >
            <p class="px-4 py-1 text-white text-sm">
              {buyedCount ? `Purchased +${buyedCount}` : 'Purchase'}
            </p>
          </div>
        {/if}
      </div>
    {/if}
  </div>
  <div class="mt-4 md:min-h-[72px] lg:min-h-0">
    <h3 class="font-semibold text-secondary">{product.name}</h3>
    <p class="text-gray-500">
      <span>${product.price ?? 100}</span>
    </p>
  </div>
</li>
