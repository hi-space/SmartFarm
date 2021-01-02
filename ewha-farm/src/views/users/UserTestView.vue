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
  </div>
</template>

<script>
import {
  BRow,
} from 'bootstrap-vue'

import CCTVPlayer from './monitoring/CCTVViewer.vue'
import SensorMonitor from './monitoring/SensorMonitor.vue'

export default {
  components: {
    BRow,
    'cctv-viewer': CCTVPlayer,
    SensorMonitor,
  },
}
</script>
