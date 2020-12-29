<template>
    <div class="vx-row">
        <!-- Weather Card -->
        <div class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base">
            <weather-card></weather-card>
        </div>
    </div>
</template>

<script>
import FarmCard from './sensor-card/FarmCard.vue'
import WeatherCard from './sensor-card/WeatherCard.vue'

export default {
  components: { WeatherCard, FarmCard },
}
</script>
