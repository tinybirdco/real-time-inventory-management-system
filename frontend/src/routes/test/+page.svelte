<script>
  import Chart from '../../components/Chart.svelte';
  import { visits, pages, referrers, os, browsers, devices } from '../inventory/data.js';
</script>

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
