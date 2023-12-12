<script>
  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import { getTinybirdData } from '../../utils/tb.js';
  import {
    Card,
    Hr,
    Table,
    Heading,
    P,
    Span,
    Spinner,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    ImagePlaceholder,
    Modal
  } from 'flowbite-svelte';

  import { slide } from 'svelte/transition';
  let loading = true;
  let openRow;
  let details;
  let inventory = [];
  let error = '';

  const toggleRow = (i) => {
    openRow = openRow === i ? null : i;
  };

  async function loadInventoryAnalytics() {
    try {
      inventory = await getTinybirdData('api_stock_ranking');
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  loadInventoryAnalytics();
</script>

<div>
  <Header />
  <div class="flex px-4 mx-auto w-full">
    <main class="lg:ml-72 w-full mx-auto">
      {#if loading}
        <Spinner />
      {:else if error}
        <p>Error: {error}</p>
      {:else}
        <div>
          <Heading
            tag="h1"
            class="mb-4"
            customSize="text-3xl font-extrabold  md:text-5xl lg:text-6xl"
          >
            Inventory Management Dashboard
          </Heading>
          <P>Powered by <Span gradient>Tinybird</Span></P>
        </div>

        <Hr classHr="my-8" />

        <div class="flex flex-wrap -mx-4">
          <Card href="/cards">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p class="font-normal text-gray-700 dark:text-gray-400 leading-tight">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
              chronological order.
            </p>
          </Card>
        </div>

        <Hr classHr="my-8" />

        <Table>
          <TableHead>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Stock</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
          </TableHead>
          <TableBody class="divide-y">
            {#each inventory as item, i}
              <TableBodyRow on:click={() => toggleRow(i)}>
                <TableBodyCell>{item.id}</TableBodyCell>
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
    </main>
  </div>

  <Footer />
</div>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  :global(*) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    font-family: 'Montserrat', sans-serif;
  }

  main {
    max-width: 800px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 20px;
    background-color: rgb(245, 245, 245);
  }
</style>
