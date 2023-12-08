<script>
  import Chart from 'chart.js/auto';
  import { onMount } from 'svelte';

  let ctx;
  let chartCanvas;

  export let type;
  export let labels;
  export let data;
  export let title;
  export let backgroundColor;
  export let showLegends = false;

  onMount(async () => {
    ctx = chartCanvas.getContext('2d');
    const chart = new Chart(ctx, {
      type,
      data: {
        labels,
        datasets: [
          {
            backgroundColor,
            data
          }
        ]
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: title
          },
          legend: {
            display: showLegends,
            position: 'bottom'
          }
        }
      }
    });
  });
</script>

<canvas bind:this={chartCanvas} />
