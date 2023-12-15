<script>
  import { onMount } from 'svelte';
  import {
    Chart,
    Card,
    A,
    Button,
    Dropdown,
    DropdownItem,
    Popover,
    Tooltip,
    Spinner
  } from 'flowbite-svelte';
  import {
    ArrowUpSolid,
    InfoCircleSolid,
    ArrowDownToBraketSolid,
    ChevronDownSolid,
    ChevronRightSolid
  } from 'flowbite-svelte-icons';
  import { getTinybirdData } from '../../utils/tb.js';
  import LoadingChart from './LoadingChart.svelte';

  let error = '';
  let loading = true;
  let kpiData = [];
  let options;
  let cart_value = 0;
  let conversion_rate = 0;
  let revenue = 0;
  let dropdownLabel = 'Last 7 days';

  async function fetchData(hours) {
    try {
      kpiData = await getTinybirdData('api_kpis', { hours_param: hours });
      cart_value = kpiData[0].cart_value;
      conversion_rate = kpiData[0].conversion_rate.toFixed(1);
      console.log(conversion_rate, 'conversion_rate');
      revenue = kpiData[0].revenue;
      const total_views = kpiData[0].total_views;
      const total_carts = kpiData[0].total_carts;
      const total_sales = kpiData[0].total_sales;

      options = {
        series: [total_views, total_carts, total_sales],
        colors: ['#1C64F2', '#16BDCA', '#FDBA8C', '#E74694'],
        chart: {
          height: 400,
          width: '100%',
          type: 'donut'
        },
        stroke: {
          colors: ['transparent'],
          lineCap: ''
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true,
                  fontFamily: 'Inter, sans-serif',
                  offsetY: 20
                },
                total: {
                  showAlways: true,
                  show: true,
                  label: 'Revenue',
                  fontFamily: 'Inter, sans-serif',
                  formatter: function (w) {
                    return new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(revenue);
                  }
                },
                value: {
                  show: true,
                  fontFamily: 'Inter, sans-serif',
                  offsetY: -20,
                  formatter: function (value) {
                    return value + 'k';
                  }
                }
              },
              size: '80%'
            }
          }
        },
        grid: {
          padding: {
            top: -2
          }
        },
        labels: ['Views', 'Cart', 'Sales'],
        dataLabels: {
          enabled: false
        },
        legend: {
          position: 'bottom',
          fontFamily: 'Inter, sans-serif'
        },
        yaxis: {
          labels: {
            formatter: function (value) {
              return value.toLocaleString();
            }
          }
        },
        xaxis: {
          labels: {
            formatter: function (value) {
              return value.toLocaleString();
            }
          },
          axisTicks: {
            show: false
          },
          axisBorder: {
            show: false
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
    await fetchData(168); // Fetch data for the default view (last 7 days)
  });

  function handleDropdownClick(item) {
    let hoursParam;
    switch (item) {
      case 'Yesterday':
        hoursParam = 48;
        dropdownLabel = 'Yesterday';
        break;
      case 'Today':
        hoursParam = 24;
        dropdownLabel = 'Today';
        break;
      case 'Last 7 days':
        hoursParam = 168;
        dropdownLabel = 'Last 7 days';
        break;
      case 'Last 30 days':
        hoursParam = 720;
        dropdownLabel = 'Last 30 days';
        break;
      case 'Last 90 days':
        hoursParam = 2160;
        dropdownLabel = 'Last 90 days';
        break;
      case 'All time':
        hoursParam = 10000;
        dropdownLabel = 'All time';
        break;
      default:
        hoursParam = 168; // Default value or error handling
        dropdownLabel = 'Last 7 days';
        break;
    }
    fetchData(hoursParam); // Fetch data based on the selected item
  }
</script>

<div>
  {#if loading}
    <LoadingChart />
  {:else if error}
    <p>Error: {error}</p>
  {:else}
    <Card>
      <div class="flex justify-between items-start w-full">
        <div class="grid grid-cols-2 py-3">
          <dl>
            <dt class="text-base font-normal text-gray-500 dark:text-gray-400 pb-1">
              Conversion rate:
            </dt>
            <dd class="leading-none text-xl font-bold text-green-500 dark:text-green-400">
              {conversion_rate}%
            </dd>
          </dl>
        </div>

        <div class="flex-col items-center">
          <div class="flex items-center mb-1">
            <InfoCircleSolid
              id="donut1"
              class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1"
            />
            <Popover
              triggeredBy="#donut1"
              class="text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 z-10"
            >
              <div class="p-3 space-y-2">
                <h3 class="font-semibold text-gray-900 dark:text-white">eCommerce KPIs</h3>
                <p>
                  This data represents e-commerce metrics including the total number of views, carts
                  added, sales made, total cart value, revenue generated, and the conversion rate
                  percentage.
                </p>
                <h3 class="font-semibold text-gray-900 dark:text-white">Calculation</h3>
                <p>
                  The conversion rate is calculated as the ratio of total sales to total views,
                  expressed as a percentage, indicating the effectiveness of converting views into
                  purchases.
                </p>
                <A href="/">Read more <ChevronRightSolid class="w-2 h-2 ms-1.5" /></A>
              </div>
            </Popover>
          </div>
        </div>
        <div class="flex justify-end items-center">
          <ArrowDownToBraketSolid class="w-3.5 h-3.5" />
          <Tooltip>Download CSV</Tooltip>
        </div>
      </div>

      <Chart {options} class="py-6" />

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
            href="/"
            class="uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
          >
            Revenue analysis
            <ChevronRightSolid class="w-2.5 h-2.5 ms-1.5" />
          </A>
        </div>
      </div>
    </Card>
  {/if}
</div>
