<template>
  <div>
    <sensor-monitor />
    <network-state-table />
  </div>
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
