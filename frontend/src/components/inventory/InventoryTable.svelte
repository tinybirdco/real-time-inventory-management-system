<script>
  import { onMount } from 'svelte';
  import { getTinybirdData } from '../../utils/tb.js';
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    ImagePlaceholder,
    Modal,
    Popover,
    Spinner
  } from 'flowbite-svelte';
  import { InfoCircleSolid } from 'flowbite-svelte-icons';

  import { slide } from 'svelte/transition';

  let details;
  let inventory = [];
  let depletionDays = [];
  let holdingCosts = [];
  let turnoverRate = [];
  let totalRetailValue = [];
  let error = '';
  let loading = true;
  let openRow;

  const toggleRow = (i) => {
    openRow = openRow === i ? null : i;
  };

  function mergeArrays(arr1, arr2) {
    const mergedArray = [];

    // Create a map of objects from arr1 using the "id" field as the key
    const arr1Map = new Map(arr1.map((item) => [item.id, item]));

    // Iterate through arr2 and merge with corresponding objects from arr1
    for (const item of arr2) {
      if (arr1Map.has(item.product)) {
        const mergedItem = { ...arr1Map.get(item.product), ...item };
        mergedArray.push(mergedItem);
      }
    }

    return mergedArray;
  }

  async function fetchData() {
    try {
      inventory = await getTinybirdData('api_stock_ranking');
      depletionDays = await getTinybirdData('api_depletion_days');
      holdingCosts = await getTinybirdData('api_holding_costs');
      turnoverRate = await getTinybirdData('api_inventory_turnover_rate');
      totalRetailValue = await getTinybirdData('api_retail_value_of_inventory');

      inventory = mergeArrays(inventory, depletionDays);
      inventory = mergeArrays(inventory, holdingCosts);
      inventory = mergeArrays(inventory, turnoverRate);
      inventory = mergeArrays(inventory, totalRetailValue);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    fetchData();
  });
</script>

<div>
  {#if loading}
    <Spinner />
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <Table>
      <TableHead>
        <TableHeadCell>Name</TableHeadCell>
        <TableHeadCell>Stock</TableHeadCell>
        <TableHeadCell>Price</TableHeadCell>
        <TableHeadCell>Total Retail Value</TableHeadCell>
        <TableHeadCell
          >Turnover Rate <InfoCircleSolid
            id="donut1"
            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
          />
          <Popover
            triggeredBy="#donut1"
            class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
          >
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">Turnover Rate</h3>
              <p>
                This measures how quickly your inventory is sold and replenished. A high turnover
                rate indicates efficient inventory management.
              </p>
            </div>
          </Popover>
        </TableHeadCell>
        <TableHeadCell
          >Daily Holding Cost
          <InfoCircleSolid
            id="donut1"
            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
          />
          <Popover
            triggeredBy="#donut1"
            class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
          >
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">Holding Cost</h3>
              <p>
                The cost for handling and storing your unsold inventory. It's calculated as the
                total of storage cost, finance cost, insurance, and taxes as well as obsolescence
                and shrinkage cost.
              </p>
            </div>
          </Popover>
        </TableHeadCell>

        <TableHeadCell
          >Depletion Date <InfoCircleSolid
            id="donut1"
            class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
          />
          <Popover
            triggeredBy="#donut1"
            class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
          >
            <div class="p-3 space-y-2">
              <h3 class="font-semibold text-gray-900 dark:text-white">Depletion Date</h3>
              <p>The date until your stock for this item will be depleted.</p>
            </div>
          </Popover>
        </TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        {#each inventory as item, i}
          <TableBodyRow on:click={() => toggleRow(i)}>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>{item.stock.toLocaleString()}</TableBodyCell>
            <TableBodyCell>{item.price}</TableBodyCell>
            <TableBodyCell>${item.total_retail_value.toLocaleString()}</TableBodyCell>
            <TableBodyCell>{item.inventory_turnover_rate.toFixed(4)}</TableBodyCell>
            <TableBodyCell>${item.total_holding_cost.toFixed(2)}</TableBodyCell>
            <TableBodyCell>{item.depletion_date}</TableBodyCell>
          </TableBodyRow>
          {#if openRow === i}
            <TableBodyRow on:dblclick={() => (details = item)}>
              <TableBodyCell colspan="4" class="p-0">
                <div class="px-2 py-3" transition:slide={{ duration: 300, axis: 'y' }}>
                  <img class="h-auto max-w-full" src={item.photo} alt="description" />
                </div>
              </TableBodyCell>
            </TableBodyRow>
          {/if}
        {/each}
      </TableBody>
    </Table>
    <Modal title={details?.name} open={!!details} autoclose outsideclose>
      <ImagePlaceholder />
    </Modal>
  {/if}
</div>
