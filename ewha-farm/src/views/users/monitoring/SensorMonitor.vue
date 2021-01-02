<template>
  <b-row>
    <b-col
      lg="6"
      sm="12"
    >
      <sensor-state-card />
    </b-col>
    <b-col
      lg="6"
      sm="12"
    >
      <weather-card />
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'

import SensorStateCard from './sensor-card/SensorStateCard.vue'
import WeatherCard from './sensor-card/WeatherCard.vue'

export default {
  components: {
    BRow,
    BCol,
    SensorStateCard,
    WeatherCard,
  },
}
</script>
