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
    <b-col
      lg="6"
      sm="12"
    >
      <sensor-graph-card
        title="온도/습도"
        :data="data1"
      />
    </b-col>
    <b-col
      lg="6"
      sm="12"
    >
      <sensor-graph-card
        title="암모니아 / 황화수소"
        :data="data2"
      />
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'

import data1 from '@/data/tem-sensor.json'
import data2 from '@/data/nh3-sensor.json'

import SensorStateCard from './sensor-card/SensorStateCard.vue'
import WeatherCard from './sensor-card/WeatherCard.vue'
import SensorGraphCard from './sensor-card/SensorGraphCard.vue'

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
      data1,
      data2,
    }
  },
}
</script>
