<script>
  import Header from '../../components/Header.svelte';
  import Footer from '../../components/Footer.svelte';
  import Chart from '../../components/Chart.svelte';
  import { visits, pages, referrers, os, browsers, devices } from './data.js';
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');

  :global(*) {
    margin: 0;
    padding: 0;
  }

  :global(body) {
    background-color: rgb(255, 137, 116);
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


<div>
  <Header />
    <main>
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