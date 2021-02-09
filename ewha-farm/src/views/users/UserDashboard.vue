<template>
  <keep-alive>
    <sensor-monitor />
    <network-state-table />
  </keep-alive>
</template>

<script>
import SensorMonitor from './monitoring/SensorMonitor.vue'
import NetworkStateTable from './monitoring/NetworkStateTable.vue'

export default {
  components: {
    SensorMonitor,
    NetworkStateTable,
  },
}
</script>
