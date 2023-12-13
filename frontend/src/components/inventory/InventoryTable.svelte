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
    Spinner
  } from 'flowbite-svelte';

  import { slide } from 'svelte/transition';

  let details;
  let inventory = [];
  let error = '';
  let loading = true;
  let openRow;

  const toggleRow = (i) => {
    openRow = openRow === i ? null : i;
  };

  onMount(async () => {
    console.log('onMount');
    try {
      inventory = await getTinybirdData('api_stock_ranking');
      console.log(inventory);
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
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
        <TableHeadCell>Status</TableHeadCell>
      </TableHead>
      <TableBody class="divide-y">
        {#each inventory as item, i}
          <TableBodyRow on:click={() => toggleRow(i)}>
            <TableBodyCell>{item.name}</TableBodyCell>
            <TableBodyCell>{item.stock}</TableBodyCell>
            <TableBodyCell>{item.price}</TableBodyCell>
            <TableBodyCell>{item.stock_status}</TableBodyCell>
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
