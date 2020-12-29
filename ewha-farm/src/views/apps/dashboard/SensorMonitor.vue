<template>
    <div class="vx-row">
        <!-- Weather Card -->
        <div class="vx-col w-full lg:w-1/2 sm:w-1/2 mb-base">
            <weather-card></weather-card>
        </div>

        <!-- Sensor Card -->
        <div class="vx-col w-full lg:w-1/2 sm:w-1/2 mb-base">
            <sensor-card></sensor-card>
        </div>

    </div>
</template>

<script>
import SensorCard from './sensor-card/SensorCard.vue'
import WeatherCard from './sensor-card/WeatherCard.vue'

export default {
  components: { 
      WeatherCard, 
      SensorCard 
    },
}
</script>
    SensorCard
