<template>
    <!-- <vx-card class="overlay-card overflow-hidden">
        <template slot="no-body">
            <img :src="weather_card.overlay_img" alt="user-profile-cover" class="responsive blur-1">
            <div class="card-overlay text-white">
                <div class="flex flex-col justify-between h-full">
                    <div class="text-center mt-8 w-full">
                        <h3 class="text-white mb-2 tracking-wide">{{ weather_card.weather }}</h3>
                        <p class="mb-6">{{ weather_card.place_name }}</p>
                        <div class="flex justify-around">
                            <feather-icon :icon="weather_card.weather_icon" svgClasses="w-24 h-24 text-white" />
                            <h2 class="text-white text-big">{{ weather_card.temperature }} <sup class="text-2xl">o</sup> </h2>
                        </div>
                    </div>
                    <div class="text-center w-full">
                        <div
                            class="flex justify-between px-8 mb-8 text-xl"
                            v-for="meta in weather_card.meta"
                            :key="meta.label">
                            <span>{{ meta.label }}</span>
                            <span>{{ meta.value }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </vx-card> -->
    
    <vx-card class="overlay-card overflow-hidden" refresh-content-action @refresh="refresh">
        <div class="flex flex-col justify-between h-full">
            <div class="text-center mt-8 w-full mb-base">
                <h3 class="mb-2 tracking-wide">{{ weather_card.weather }}</h3>
                <p class="mb-6">{{ weather_card.place_name }}</p>
                <div class="flex justify-around">
                    <!-- <feather-icon :icon="weather_card.weather_icon" svgClasses="w-24 h-24 text-default" /> -->
                    <img :src="weather_card.weather_icon" width="140">
                    <h2 class="text-big p-8">{{ weather_card.temperature }} 
                        <sup class="text-2xl">o</sup> 
                    </h2>
                </div>
            </div>            
            <div class="text-center w-full">
                <div
                    class="flex justify-between px-8 mb-8 text-xl"
                    v-for="meta in weather_card.meta"
                    :key="meta.label">
                    <span>{{ meta.label }}</span>
                    <span>{{ meta.value }}</span>
                </div>
            </div>
            <div class="text-center w-full">
                <p class="mb-6">{{ weather_card.time }}</p>
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