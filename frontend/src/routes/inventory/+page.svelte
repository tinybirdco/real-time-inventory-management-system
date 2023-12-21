<script>
  import Header from '../../components/layout/Header.svelte';
  import Footer from '../../components/layout/Footer.svelte';
  import InventoryTable from '../../components/inventory/InventoryTable.svelte';
  import TotalSalesPerDay from '../../components/inventory/TotalSalesPerDay.svelte';
  import RevenueTrendChart from '../../components/inventory/RevenueTrendChart.svelte';
  import KPIChart from '../../components/inventory/KPIChart.svelte';
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

      <div class="flex flex-col md:flex-row">
        <div class="md:w-1/2">
          <TotalSalesPerDay />
        </div>
        <div class="my-8 md:my-0 md:mx-8 md:w-1/2">
          <KPIChart />
        </div>
      </div>

      <Hr classHr="my-8" />

      <div>
        <RevenueTrendChart />
      </div>

      <Hr classHr="my-8" />

      <InventoryTable />
    </main>
  </div>

  <Footer />
</div>

<style>
  :global(*) {
    margin: 0;
    padding: 0;
  }
</style>
