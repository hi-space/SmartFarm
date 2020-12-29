<template>
     <div class="vx-row">
            <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="EyeIcon"
                  statistic="36.9k"
                  statisticTitle="Views" />
            </div>

            <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="MessageSquareIcon"
                  statisticTitle="Comments"
                  statistic="12k"
                  color="success" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="ActivityIcon"
                  icon-right
                  statistic="0.1%"
                  statisticTitle="Downtime Ratio"
                  color="danger" />
            </div>

            
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <vx-card title="Sessions By Device">
                    <ul>
                        <li v-for="deviceData in analyticsData" :key="deviceData.device" class="flex mb-3">
                            <feather-icon :icon="deviceData.icon" :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"></feather-icon>
                            <span class="ml-2 inline-block font-semibold">{{ deviceData.device }}</span>
                            <span class="mx-2">-</span>
                            <span class="mr-4">{{ deviceData.sessionsPercentage }}%</span>
                            <div class="ml-auto flex -mr-1">
                            <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
                            <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
                            </div>
                        </li>
                    </ul>

                </vx-card>
            </div>


            <!-- LINE CHART -->
            <div class="vx-col w-full md:w-2/3 mb-base">
                <vx-card title="Revenue">

                    <template slot="actions">
                        <!-- <feather-icon icon="SettingsIcon" svgClasses="w-6 h-6 text-grey"></feather-icon> -->
                        <change-time-duration-dropdown />
                    </template>

                    <div slot="no-body" class="p-6 pb-0">

                        <div class="flex" v-if="revenueComparisonLine.analyticsData">
                            <div class="mr-6">
                                <p class="mb-1 font-semibold">This Month</p>
                                <p class="text-3xl text-success"><sup class="text-base mr-1">$</sup>{{ revenueComparisonLine.analyticsData.thisMonth.toLocaleString() }}</p>
                            </div>
                            <div>
                                <p class="mb-1 font-semibold">Last Month</p>
                                <p class="text-3xl"><sup class="text-base mr-1">$</sup>{{ revenueComparisonLine.analyticsData.lastMonth.toLocaleString() }}</p>
                            </div>
                        </div>

                        <vue-apex-charts
                          type="line"
                          height="266"
                          :options="chartOptions"
                          :series="revenueComparisonLine.series" />
                    </div>
                </vx-card>
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
            
                <statistics-card-line
                  class="mb-base"
                  v-if="subscribersGained.analyticsData"
                  icon="UsersIcon"
                  :statistic="subscribersGained.analyticsData.subscribers"
                  statisticTitle="Subscribers Gained"
                  :chartData="subscribersGained.series"
                  type="area" 
                  color="warning"
                  />
            </div>
     </div>

</template>

<script>
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '@/views/components/statistics-cards/StatisticsCardLine.vue'
import ChangeTimeDurationDropdown from '@/views/components/ChangeTimeDurationDropdown.vue'

export default {
    components: {
        VueApexCharts,
        ChangeTimeDurationDropdown,
        StatisticsCardLine
    },
    data () {
        return {
            subscribersGained: {
                "series": [
                    {
                    "name": "Subscribers",
                    "data": [
                        28,
                        40,
                        36,
                        52,
                        38,
                        60,
                        55
                    ]
                    }
                ],
                "analyticsData": {
                    "subscribers": 92600
                }
            },
            revenueComparisonLine: {
                "analyticsData": {
                    "thisMonth": 86589,
                    "lastMonth": 73683
                },
                "series": [
                    {
                    "name": "This Month",
                    "data": [
                        45000,
                        47000,
                        44800,
                        47500,
                        45500,
                        48000,
                        46500,
                        48600
                    ]
                    },
                    {
                    "name": "Last Month",
                    "data": [
                        46000,
                        48000,
                        45500,
                        46600,
                        44500,
                        46500,
                        45000,
                        47000
                    ]
                    }
                ]
            },
            chartOptions: {
                chart: {
                    toolbar: { show: false },
                    dropShadow: {
                    enabled: true,
                    top: 5,
                    left: 0,
                    blur: 4,
                    opacity: 0.10
                    }
                },
                stroke: {
                    curve: 'smooth',
                    dashArray: [0, 8],
                    width: [4, 2]
                },
                grid: {
                    borderColor: '#e7e7e7'
                },
                legend: {
                    show: false
                },
                colors: ['#F97794', '#b8c2cc'],
                fill: {
                    type: 'gradient',
                    gradient: {
                    shade: 'dark',
                    inverseColors: false,
                    gradientToColors: ['#7367F0', '#b8c2cc'],
                    shadeIntensity: 1,
                    type: 'horizontal',
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 100, 100, 100]
                    }
                },
                markers: {
                    size: 0,
                    hover: {
                    size: 5
                    }
                },
                xaxis: {
                    labels: {
                    style: {
                        cssClass: 'text-grey fill-current'
                    }
                    },
                    axisTicks: {
                    show: false
                    },
                    categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
                    axisBorder: {
                    show: false
                    }
                },
                yaxis: {
                    tickAmount: 5,
                    labels: {
                    style: {
                        cssClass: 'text-grey fill-current'
                    },
                    formatter (val) {
                        return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
                    }
                    }
                },
                tooltip: {
                    x: { show: false }
                }
            },
            analyticsData:  [
                {
                    "device": "Dekstop",
                    "icon": "MonitorIcon",
                    "color": "primary",
                    "sessionsPercentage": 58.6,
                    "comparedResultPercentage": 2
                },
                {
                    "device": "Mobile",
                    "icon": "SmartphoneIcon",
                    "color": "warning",
                    "sessionsPercentage": 34.9,
                    "comparedResultPercentage": 8
                },
                {
                    "device": "Tablet",
                    "icon": "TabletIcon",
                    "color": "danger",
                    "sessionsPercentage": 6.5,
                    "comparedResultPercentage": -5
                }
            ]
                
        }
    }
}
</script>
