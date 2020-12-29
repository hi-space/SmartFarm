<template>
    <vx-card title="농장 환경" class="overflow-hidden">
        <ul>
            <li v-for="sensorData in sensorList" :key="sensorData.id" class="flex mb-5">
                <feather-icon 
                    :icon="sensorData.icon" 
                    :svgClasses="[`h-5 w-5 stroke-current text-${sensorData.color}`]">
                </feather-icon>
                <span class="ml-3 inline-block font-semibold text-xl">{{ sensorData.name }}</span>
                <div class="ml-auto flex">
                    <span class="mr-1 text-xl">{{ sensorData.value }}</span>
                </div>
            </li>
        </ul>
    </vx-card>
</template>

<script>
import sensorList from '@/data/farmSensor.json'

export default {
    components: {
    },
    data () {
        return {
            sensorList: sensorList,
        }
    }
}
</script>
