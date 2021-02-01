<template>
  <b-card-actions
    title="센서 그래프"
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
        :series="[]"
      />
    </b-card-body>

  </b-card-actions>
</template>

<script>
import {
  BCardBody,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
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
  data() {
    return {
      rangePicker: ['2019-05-01', '2019-05-10'],
      sensorList: [],
      chartOptions: {
        chart: {
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          type: 'datetime',
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
  methods: {
    updateUI(sensorData) {
      const series = []
      console.log(sensorData)
      sensorData.forEach(element => {
        const xydata = []
        element.values.forEach(el => {
          xydata.push({
            x: new Date(el.time).getTime(),
            y: el.value,
          })
        })

        series.push({
          name: element.name,
          data: xydata,
        })
      })

      this.$refs.chart.updateSeries(series)
    },
  },
}
</script>
