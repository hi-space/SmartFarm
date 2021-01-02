<template>
    <vx-card :title=title collapse-action>
        <line-chart :height="250" :data="data" :options="options"></line-chart>
    </vx-card>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue'

export default {
    components: {
        LineChart,
    },
    props: {
        title: {
            type: String,
            default: '',
        }
    },
    data () {
        return {
            data: {
                labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
                datasets: [
                    {
                        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
                        label: 'Africa',
                        borderColor: '#7367F0',
                        fill: false
                    }, 
                    {
                        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
                        label: 'Asia',
                        borderColor: '#28C76F',
                        fill: false
                    }, 
                ]
            },
            options: {
                title: {
                    display: false,
                    text: 'World population per region (in millions)'
                },
            }
        }
    },
}
</script>
