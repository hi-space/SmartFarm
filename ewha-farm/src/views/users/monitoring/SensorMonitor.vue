<template>
  <div>
    <b-row
      class="match-height"
      no-body
    >
      <b-col
        lg="6"
        sm="12"
      >
        <weather-card />
      </b-col>
      <b-col
        lg="6"
        sm="12"
      >
        <sensor-state-card
          ref="sensorStateCard"
        />
      </b-col>
      <b-col
        sm="12"
      >
        <sensor-graph-card
          ref="sensorGraphCard"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'

import { getUserData } from '@/auth/utils'
import store from '@/store'
import SensorStateCard from './components/SensorStateCard.vue'
import WeatherCard from './components/WeatherCard.vue'
import SensorGraphCard from './components/SensorGraphCard.vue'

export default {
  components: {
    BRow,
    BCol,
    SensorStateCard,
    WeatherCard,
    SensorGraphCard,
  },
  data() {
    return {
      sensorData: [],
    }
  },
  created() {
    this.getSensor()
  },
  methods: {
    async getSensor() {
      const result = await store.dispatch('sensor/fetchSensors',
        { userId: getUserData().id })
      this.sensorData = result.data

      this.$refs.sensorStateCard.updateUI(this.sensorData)
      this.$refs.sensorGraphCard.updateUI(this.sensorData)
    },
  },
}
</script>
