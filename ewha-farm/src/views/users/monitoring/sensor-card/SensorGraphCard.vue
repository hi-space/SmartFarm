<template>
  <b-card
    :title="title"
  >
    <b-row>
      <!-- chart -->
      <chartjs-component-line-chart
        :height="250"
        :data="data"
      />
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BRow,
} from 'bootstrap-vue'
import ChartjsComponentLineChart from './charts-components/ChartjsComponentLineChart.vue'

export default {
  components: {
    BCard,
    BRow,
    ChartjsComponentLineChart,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
    data: {
      type: Object,
      default: null,
    },
  },
}
</script>
