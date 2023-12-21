<script>
  import { onMount } from 'svelte';
  import { Chart, Card, A, Button, Dropdown, DropdownItem, Spinner } from 'flowbite-svelte';
  import { ArrowUpSolid, ChevronDownSolid, ChevronRightSolid } from 'flowbite-svelte-icons';
  import { getTinybirdData } from '../../utils/tb.js';

  let error = '';
  let loading = true;
  let revenueTrendData = [];
  let dates = [];
  let revenue = [];
  let cartValue = [];
  let sumCartValue = 0;
  let sumRevenue = 0;
  let dropdownLabel = 'Last 7 days';
  let options;

  async function fetchData(days) {
    try {
      revenueTrendData = await getTinybirdData('api_rev_trend', { days_param: days });
      cartValue = revenueTrendData.map((item) => item.cart_value);
      revenue = revenueTrendData.map((item) => item.revenue);
      dates = revenueTrendData.map((item) => item.ts);
      sumCartValue = cartValue
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toLocaleString();
      sumRevenue = revenue
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toLocaleString();

      console.log(revenueTrendData);

      options = {
        series: [
          {
            name: 'Cart Value',
            data: cartValue,
            color: '#31C48D'
          },
          {
            name: 'Revenue',
            data: revenue,
            color: '#FDBA8C'
          }
        ],

        chart: {
          sparkline: {
            enabled: false
          },
          type: 'area',
          //   width: '100%',
          height: 400,
          toolbar: {
            show: false
          }
        },
        fill: {
          opacity: 1
        },
        plotOptions: {
          bar: {
            horizontal: false,
            // columnWidth: '100%',
            borderRadiusApplication: 'end',
            borderRadius: 6,
            dataLabels: {
              position: 'top'
            }
          }
        },
        legend: {
          show: true,
          position: 'bottom'
        },
        dataLabels: {
          enabled: false
        },
        tooltip: {
          shared: true,
          intersect: false,
          formatter: function (value) {
            return '$' + value;
          }
        },
        xaxis: {
          labels: {
            show: true,
            style: {
              fontFamily: 'Inter, sans-serif',
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
          },
          categories: dates,
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
          }
        },
        yaxis: {
          labels: {
            show: true,
            style: {
              fontFamily: 'Inter, sans-serif',
              cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
            }
          }
        },
        grid: {
          show: true,
          strokeDashArray: 4,
          padding: {
            left: 2,
            right: 2,
            top: -20
          }
        }
      };
    } catch (err) {
      error = err.message;
    } finally {
      loading = false;
    }
  }

  onMount(async () => {
    await fetchData(7); // Fetch data for the default view (last 7 days)
  });

  function handleDropdownClick(item) {
    let days;
    switch (item) {
      case 'Yesterday':
        days = 2;
        dropdownLabel = 'Yesterday';
        break;
      case 'Today':
        days = 1; // Adjust as needed
        dropdownLabel = 'Today';
        break;
      case 'Last 7 days':
        days = 7;
        dropdownLabel = 'Last 7 days';
        break;
      case 'Last 30 days':
        days = 30;
        dropdownLabel = 'Last 30 days';
        break;
      case 'Last 90 days':
        days = 90;
        dropdownLabel = 'Last 90 days';
        break;
      case 'All time':
        days = 100;
        dropdownLabel = 'All time';
        break;
      default:
        days = 7; // Default value or error handling
        dropdownLabel = 'Last 7 days';
        break;
    }
    fetchData(days); // Fetch data based on the selected item
  }
</script>

<div>
  {#if loading}
    <Spinner />
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <Card class="flex-1 mx-4" size="xl">
      <div class="flex justify-between">
        <dl>
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Revenue Trend</dt>
          <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            ${sumCartValue}
          </dd>
        </dl>
      </div>

      <div class="grid grid-cols-2 py-3">
        <dl>
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Revenue</dt>
          <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">
            ${sumRevenue}
          </dd>
        </dl>
        <dl>
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
            Total Cart Value
          </dt>
          <dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">
            ${sumCartValue}
          </dd>
        </dl>
      </div>

      <Chart {options} />

      <div
        class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
      >
        <div class="flex justify-between items-center pt-5">
          <Button
            class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
            >{dropdownLabel}<ChevronDownSolid class="w-2.5 m-2.5 ms-1.5" /></Button
          >
          <Dropdown class="w-40" offset="-6">
            <DropdownItem on:click={() => handleDropdownClick('Yesterday')}>Yesterday</DropdownItem>
            <DropdownItem on:click={() => handleDropdownClick('Today')}>Today</DropdownItem>
            <DropdownItem on:click={() => handleDropdownClick('Last 7 days')}
              >Last 7 days</DropdownItem
            >
            <DropdownItem on:click={() => handleDropdownClick('Last 30 days')}
              >Last 30 days</DropdownItem
            >
            <DropdownItem on:click={() => handleDropdownClick('Last 90 days')}
              >Last 90 days</DropdownItem
            >
            <DropdownItem on:click={() => handleDropdownClick('All time')}>All time</DropdownItem>
          </Dropdown>

          <A
            href="/#"
            class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
          >
            Sales Report
            <ChevronRightSolid class="w-2.5 h-2.5 ms-1.5" />
          </A>
        </div>
      </div>
    </Card>
  {/if}
</div>
