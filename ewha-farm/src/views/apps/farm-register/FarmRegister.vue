<template>
    <div class="vx-row">
        <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
            <device-register></device-register>
        </div>
        <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
            <relay-register></relay-register>
        </div>
        <div class="vx-col w-full sm:w-1/2 lg:w-1/2 mb-base">
            <button-register></button-register>
        </div>
    </div>
</template>

<script>

import DeviceRegister from './DeviceRegister.vue'
import RelayRegister from './RelayRegister.vue'
import ButtonRegister from './ButtonRegister.vue'

export default {
    components: {
        DeviceRegister,
        RelayRegister,
        ButtonRegister,
    }
}
</script>