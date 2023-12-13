<script>
  import Header from '../../components/layout/Header.svelte';
  import Footer from '../../components/layout/Footer.svelte';
  import InventoryTable from '../../components/inventory/InventoryTable.svelte';
  import { Card, Hr, Heading, Span } from 'flowbite-svelte';
</script>

<div>
  <Header />
  <div class="flex mx-auto w-full">
    <main class="mx-auto">
      <div>
        <Heading tag="h1" class="mb-4" customSize="text-3xl font-extrabold md:text-5xl lg:text-6xl">
          Inventory Management Dashboard
        </Heading>
        <Heading tag="h3" class="mb-4" customSize="text-3xl font-extrabold md:text-5xl lg:text-6xl"
          >Powered by <Span gradient>Tinybird</Span></Heading
        >
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
