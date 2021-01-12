<template>
  <b-card-actions
    :title="title"
    action-collapse
  >
    <b-row>
      <!-- chart -->
      <chartjs-component-line-chart
        :height="250"
        :data="data"
      />
    </b-row>
  </b-card-actions>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import ChartjsComponentLineChart from './charts-components/ChartjsComponentLineChart.vue'

export default {
  components: {
    BCardActions,
    ChartjsComponentLineChart,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      data: {
        labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
        datasets: [
          {
            data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
            label: '온도',
            borderColor: '#7367F0',
            fill: false,
          },
          {
            data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
            label: '습도',
            borderColor: '#28C76F',
            fill: false,
          },
        ],
      },
    }
  },
}
</script>
