<script>
  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import Chart from '../../components/Chart.svelte';
  import { visits, pages, referrers, os, browsers, devices } from './data.js';
  import { Alert } from 'flowbite-svelte';
  import {
    Table,
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

  async function loadInventory() {
    try {
      const token = import.meta.env.VITE_TB_READ_TOKEN;
      const host = import.meta.env.VITE_TB_HOST;
      const params = new URLSearchParams({ token });
      const apiUrl = `https://${host}/v0/pipes/api_stock_ranking.json?${params}`;

      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      inventory = data.data;
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  loadInventory();
</script>

<div>
  <Header />
  <main>
    <div class="p-8">
      <Alert>
        <span class="font-medium">Info alert!</span>
        Change a few things up and try submitting again.
      </Alert>
    </div>

    {#if loading}
      <p>Loading...</p>
    {:else if error}
      <p>Error: {error}</p>
    {:else}
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

    <h3>Monthly Visitors</h3>
    <section>
      <Chart {...visits} />
    </section>
    <h3>Top pages and Referrers</h3>
    <div id="pages">
      <section>
        <Chart {...pages} />
      </section>
      <section>
        <Chart {...referrers} />
      </section>
    </div>
    <h3>OS, Browsers and Devices</h3>
    <div id="devices">
      <section>
        <Chart {...os} showLegends={true} />
      </section>
      <section>
        <Chart {...browsers} showLegends={true} />
      </section>
      <section>
        <Chart {...devices} showLegends={true} />
      </section>
    </div>
  </main>

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

  h3 {
    padding: 20px 0;
  }

  section {
    min-width: 100%;
    background-color: white;
    border-radius: 10px;
  }

  #pages {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  #devices {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    padding-bottom: 20px;
  }

  @media only screen and (max-width: 560px) {
    #pages,
    #devices {
      grid-template-columns: 1fr;
    }
  }
</style>
