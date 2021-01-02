<template>
  <div>
    <add-device-modal />
    <add-relay-modal />
    <add-button-modal />
    <add-camera-modal />
  </div>
</template>

<script>
import AddDeviceModal from './register/AddDeviceModal.vue'
import AddRelayModal from './register/AddRelayModal.vue'
import AddButtonModal from './register/AddButtonModal.vue'
import AddCameraModal from './register/AddCameraModal.vue'

export default {
  components: {
    'add-device-modal': AddDeviceModal,
    'add-relay-modal': AddRelayModal,
    'add-button-modal': AddButtonModal,
    'add-camera-modal': AddCameraModal,
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
