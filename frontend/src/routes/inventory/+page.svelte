<script>
  import Header from '../../components/layout/Header.svelte';
  import Footer from '../../components/layout/Footer.svelte';
  import InventoryTable from '../../components/inventory/InventoryTable.svelte';
  import TotalSalesPerDay from '../../components/inventory/TotalSalesPerDay.svelte';
  import { Hr, Heading, Span } from 'flowbite-svelte';
</script>

<div>
  <Header />

  <Hr classHr="my-8" />

  <div class="flex w-full">
    <main class="mx-auto">
      <div class="text-center">
        <Heading tag="h1" class="mb-4" customSize="text-3xl font-extrabold md:text-5xl lg:text-6xl">
          Inventory Management Dashboard
        </Heading>
        <Heading tag="h3" class="mb-4">By <Span gradient>Tinybird</Span></Heading>
      </div>

      <Hr classHr="my-8" />

      <Span
        class="flex bg-primary-100 text-primary-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded dark:bg-primary-200 dark:text-primary-800"
      >
        <TotalSalesPerDay />
        <TotalSalesPerDay />
        <TotalSalesPerDay />
      </Span>

      <Hr classHr="my-8" />

      <InventoryTable />
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
    /* max-width: 800px;
    min-height: 100vh;
    margin: 0 auto;
    padding: 0 20px;
    background-color: rgb(245, 245, 245); */
  }
</style>
