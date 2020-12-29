<template>
     <div class="vx-row">
        <div class="vx-col w-full md:w-2/3 mb-base">
            <vx-card title="Revenue">
                <line-chart :height="250" :data="data" :options="options"></line-chart>
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

import subscribersGained from '@/data/subscribersGained.json'
import revenueComparisonLine from '@/data/revenueComparisonLine.json'
import analyticsData from '@/data/analyticsData.json'
import chartOptions from './chart-options.js'

import LineChart from '@/views/components/charts/LineChart.vue'

export default {
    components: {
        VueApexCharts,
        ChangeTimeDurationDropdown,
        StatisticsCardLine,
        LineChart,
    },
    data () {
        return {
            subscribersGained: subscribersGained,
            revenueComparisonLine: revenueComparisonLine,
            chartOptions: chartOptions.revenuechartOptions,
            analyticsData: analyticsData,
            data: {
                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                datasets: [
                {
                    data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                    label: 'Africa',
                    borderColor: '#7367F0',
                    fill: false
                }, {
                    data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                    label: 'Asia',
                    borderColor: '#28C76F',
                    fill: false
                }, {
                    data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
                    label: 'Europe',
                    borderColor: '#EA5455',
                    fill: false
                }, {
                    data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
                    label: 'Latin America',
                    borderColor: '#FF9F43',
                    fill: false
                }, {
                    data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
                    label: 'North America',
                    borderColor: '#1E1E1E',
                    fill: false
                }
                ]
            },
            options: {
                title: {
                    display: false,
                    text: 'World population per region (in millions)'
                }
            }
        }
    },
}
</script>
