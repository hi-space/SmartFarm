<template>
  <b-card-actions
    :title="title"
    action-collapse
    no-body
  >
    <!-- datepicker -->
    <!-- <b-form-group>
      <feather-icon
        icon="CalendarIcon"
        size="16"
      />
      <flat-pickr
        v-model="rangePicker"
        class="form-control"
        :config="{ mode: 'range'}"
      />
    </b-form-group> -->

    <b-card-body>
      <!-- datepicker -->
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
    // BFormGroup,
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
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        markers: {
          strokeWidth: 2,
          strokeOpacity: 1,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          curve: 'straight',
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
      },
    }
  },
  mounted() {
    axiosIns.get('/utils/sensor/123').then(res => {
      console.log(res.data)
      this.$refs.chart.updateSeries(res.data)
    }).catch(err => {
      console.log(err)
    })
  },
}
</script>
