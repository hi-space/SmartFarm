<template>
  <div>
    <cctv-viewer />
    <sensor-monitor />
    <network-state-table />
  </div>
</template>

<script>
// import {
//   BRow,
// } from 'bootstrap-vue'

import CCTVPlayer from './monitoring/CCTVViewer.vue'
import SensorMonitor from './monitoring/SensorMonitor.vue'
import NetworkStateTable from './monitoring/NetworkStateTable.vue'

export default {
  components: {
    // BRow,
    'cctv-viewer': CCTVPlayer,
    SensorMonitor,
    NetworkStateTable,
  },
}
</script>
