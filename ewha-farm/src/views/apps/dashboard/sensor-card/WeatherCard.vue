<template>    
    <vx-card title="현재 날씨" class="overlay-card overflow-hidden" refresh-content-action @refresh="refresh">
        <div class="flex flex-col justify-between h-full">
            <div class="text-center mt-4 w-full mb-4">
                <h3 class="mb-2 tracking-wide">{{ weather_card.weather }}</h3>
                <p class="mb-4">{{ weather_card.place_name }}</p>
                <div class="flex justify-around">
                    <img :src="weather_card.weather_icon" width="140">
                    <h2 class="text-big p-8">{{ weather_card.temperature }} 
                        <sup class="text-2xl">o</sup> 
                    </h2>
                </div>
            </div>            
            <div class="text-center w-full">
                <div
                    class="flex justify-between px-8 mb-4 text-xl"
                    v-for="meta in weather_card.meta"
                    :key="meta.label">
                    <span class="font-semibold">{{ meta.label }}</span>
                    <span>{{ meta.value }}</span>
                </div>
            </div>
            <div class="text-center w-full">
                <p>{{ weather_card.time }}</p>
            </div>
        </div>
    </vx-card>
</template>

<script>
import wetherData from "@/data/weather.json"

export default {
    data () {
        return {
            weather_card: wetherData,
        }
    },
    methods: {
        refresh (card) {
            console.log("refresh")
            card.removeRefreshAnimation(3000)
        }
    }
}
</script>

<style lang="scss">
.overlay-card {
        .vx-card__collapsible-content {
            max-height: 485px;
        }
    }
</style>