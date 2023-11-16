<script>
  import { page } from '$app/stores';
  import ProductTile from '../components/ProductTile.svelte';
  import Header from '../components/Header.svelte';
  import Footer from '../components/Footer.svelte';

  import { Category, Stock, Ranking } from '../utils/filters';

  let stockValues = [Stock.all, Stock.inStock];
  let rankingValues = [Ranking.bestSellers, Ranking.price];
  let categoryValues = [Category.all, Category.clothing, Category.accessories];

  $: category = $page.url.searchParams.get('category') || Category.all;
  $: stock = $page.url.searchParams.get('show_oos') || Stock.inStock;
  $: ranking = $page.url.searchParams.get('ranking') || Ranking.bestSellers;

  export let data;

  function buildFilterUrl({ category, stock, ranking }) {
    const params = new URLSearchParams({ category, show_oos: stock, ranking });
    return `/?${params.toString()}`;
  }
</script>

<div>
  <Header />
  <main>
    <div
      class="container mt-16 mx-auto flex flex-col gap-4 pb-4 text-black dark:text-white md:flex-row"
    >
      <nav class="order-first w-full flex-none md:max-w-[200px]">
        <h1 class="text-xl font-semibold text-secondary">Categories</h1>
        {#each categoryValues as categoryValue}
          <a
            href={buildFilterUrl({ category: categoryValue, stock, ranking })}
            data-sveltekit-noscroll
            class={`capitalize block mt-2 text-sm text-secondary underline-offset-4 hover:underline ${
              categoryValue === category ? 'underline' : ''
            }`}
          >
            {categoryValue}
          </a>
        {/each}
        <h1 class="mt-6 text-xl font-semibold text-secondary">Availability</h1>
        {#each stockValues as stockValue}
          <a
            href={buildFilterUrl({ category, stock: stockValue, ranking })}
            data-sveltekit-noscroll
            class={`block mt-2 text-sm text-secondary underline-offset-4 hover:underline ${
              stockValue === stock ? 'underline' : ''
            }`}
          >
            {stockValue === '1' ? 'All' : 'In stock'}
          </a>
        {/each}
        <h1 class="mt-6 text-xl font-semibold text-secondary">Sort</h1>
        {#each rankingValues as rankingValue}
          <a
            href={buildFilterUrl({ category, stock, ranking: rankingValue })}
            data-sveltekit-noscroll
            class={`block mt-2 text-sm text-secondary underline-offset-4 hover:underline ${
              rankingValue === ranking ? 'underline' : ''
            }`}
          >
            {rankingValue === Ranking.bestSellers ? 'Best sellers' : 'Price (high to low)'}
          </a>
        {/each}
      </nav>
      <section class="order-last min-h-screen w-full md:order-none">
        <ul
          class="grid grid-flow-row gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {#each data.products as product}
            <ProductTile priority="eager" {product} />
          {/each}
        </ul>
      </section>
    </div>
  </main>
  <Footer />
</div>
