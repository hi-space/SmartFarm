<template>
  <b-card-actions
    :title="title"
    action-collapse
  >
    <!-- datepicker -->
    <!-- <div class="d-flex align-items-center">
      <feather-icon
        icon="CalendarIcon"
        size="16"
      />
      <flat-pickr
        v-model="rangePicker"
        :config="{ mode: 'range'}"
        class="form-control flat-picker bg-transparent border-0 shadow-none"
        placeholder="YYYY-MM-DD"
      />
    </div> -->
    <!-- datepicker -->

    <b-card-body>
      <vue-apex-charts
        ref="chart"
        type="area"
        height="400"
        :options="chartOptions"
        :series="sensorData"
      />
    </b-card-body>

  </b-card-actions>
</template>

<script>
import {
  BCardBody,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import axiosIns from '@/libs/axios'
import VueApexCharts from 'vue-apexcharts'
// import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BCardActions,
    BCardBody,
    // flatPickr,
    VueApexCharts,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      rangePicker: ['2019-05-01', '2019-05-10'],
      sensorData: [],
      chartOptions: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: false,
          curve: 'straight',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        xaxis: {
        },
        fill: {
          opacity: 1,
          type: 'solid',
        },
      },
    }
  },
  mounted() {
    axiosIns.get('/dummy/sensor/123').then(res => {
      console.log(res.data)
      this.$refs.chart.updateSeries(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
}
</script>
