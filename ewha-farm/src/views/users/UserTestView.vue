<template>
  <div>
    <b-row
      class="mb-4"
    >
      <cctv-viewer />
    </b-row>
    <b-row
      class="mb-2"
    >
      <sensor-monitor />
    </b-row>

    <network-state-table />
  </div>
</template>

<script>
import {
  BRow,
} from 'bootstrap-vue'

import CCTVPlayer from './monitoring/CCTVViewer.vue'
import SensorMonitor from './monitoring/SensorMonitor.vue'
import NetworkStateTable from './monitoring/NetworkStateTable.vue'

export default {
  components: {
    BRow,
    'cctv-viewer': CCTVPlayer,
    SensorMonitor,
    NetworkStateTable,
  },
}
</script>
