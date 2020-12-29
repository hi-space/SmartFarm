<template>
    <div class="vx-row">
        <!-- Weather Card -->
        <div class="vx-col w-full lg:w-1/2 mb-base">
            <weather-card></weather-card>
        </div>

        <!-- Sensor Card -->
        <div class="vx-col w-full lg:w-1/2 mb-base">
            <sensor-card></sensor-card>
        </div>

        <!-- Sensor Graph Card -->
        <div class="vx-col w-full xl:w-1/2 mb-base">
            <vx-card title="온도 / 습도">
                <sensor-graph-card></sensor-graph-card>
            </vx-card>
        </div>

        <!-- Sensor Graph Card -->
        <div class="vx-col w-full xl:w-1/2 mb-base">
            <vx-card title="암모니아 / 황화수소">
                <sensor-graph-card></sensor-graph-card>
            </vx-card>
        </div>
    </div>
</template>

<script>
import SensorCard from './sensor-card/SensorCard.vue'
import SensorGraphCard from './sensor-card/SensorGraphCard.vue'
import WeatherCard from './sensor-card/WeatherCard.vue'


export default {
  components: { 
      WeatherCard, 
      SensorCard,
    SensorGraphCard 
    },
}
</script>
    SensorCard
