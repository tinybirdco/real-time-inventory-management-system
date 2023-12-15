<script>
  import { onMount } from 'svelte';
  import { Chart, Card, A, Button, Dropdown, DropdownItem, Spinner } from 'flowbite-svelte';
  import { ArrowUpSolid, ChevronDownSolid, ChevronRightSolid } from 'flowbite-svelte-icons';
  import { getTinybirdData } from '../../utils/tb.js';
  //   import { LoadingChart } from './LoadingChart.svelte';

  let error = '';
  let loading = true;
  let totalSalesPerDay = [];
  let dates = [];
  let salesValues = [];
  let sumSalesValues = 0;
  let options;

  async function fetchData(days) {
    try {
      totalSalesPerDay = await getTinybirdData('api_total_sales_per_day', { days: days });
      dates = totalSalesPerDay.map((item) => item.sale_date.slice(5));
      salesValues = totalSalesPerDay.map((item) => item.total_sales_value);
      sumSalesValues = salesValues
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toLocaleString();

      console.log(sumSalesValues, 'salesValues');

      options = {
        series: [
          {
            name: 'Sales',
            data: salesValues,
            color: '#31C48D'
          }
        ],

        chart: {
          sparkline: {
            enabled: false
          },
          type: 'bar',
          width: '100%',
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
            columnWidth: '100%',
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
        break;
      case 'Today':
        days = 1; // Adjust as needed
        break;
      case 'Last 7 days':
        days = 7;
        break;
      case 'Last 30 days':
        days = 30;
        break;
      case 'Last 90 days':
        days = 90;
        break;
      case 'All time':
        days = 100;
        break;
      default:
        days = 7; // Default value or error handling
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
    <Card>
      <div class="flex justify-between">
        <dl>
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Total Sales</dt>
          <dd class="leading-none text-3xl font-bold text-gray-900 dark:text-white">
            {sumSalesValues}
          </dd>
        </dl>
        <div>
          <span
            class="bg-green-100 text-green-800 text-xs font-medium inline-flex items-center px-2.5 py-1 rounded-md dark:bg-green-900 dark:text-green-300"
          >
            <ArrowUpSolid class="w-2.5 h-2.5 me-1.5" />
            Profit rate 23.5%
          </span>
        </div>
      </div>

      <div class="grid grid-cols-2 py-3">
        <dl>
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Income</dt>
          <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">$23,635</dd>
        </dl>
        <dl>
          <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">Expense</dt>
          <dd class="leading-none text-xl font-bold text-red-600 dark:text-red-500">-$18,230</dd>
        </dl>
      </div>

      <Chart {options} />

      <div
        class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"
      >
        <div class="flex justify-between items-center pt-5">
          <Button
            class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
            >Last 7 days<ChevronDownSolid class="w-2.5 m-2.5 ms-1.5" /></Button
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
            href="/"
            class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
          >
            Leads Report
            <ChevronRightSolid class="w-2.5 h-2.5 ms-1.5" />
          </A>
        </div>
      </div>
    </Card>
  {/if}
</div>
