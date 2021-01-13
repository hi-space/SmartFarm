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
        <sensor-state-card />
      </b-col>
      <b-col
        lg="6"
        sm="12"
      >
        <sensor-graph-card
          title="온도/습도"
        />
      </b-col>
      <b-col
        lg="6"
        sm="12"
      >
        <sensor-graph-card
          title="암모니아 / 황화수소"
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
}
</script>
