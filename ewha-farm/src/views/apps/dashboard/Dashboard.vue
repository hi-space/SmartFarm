<template>
  <div class="vx-row">
    <cctv-viewer></cctv-viewer>    
    <sensor-monitor></sensor-monitor>
  </div>
</template>

<script>
import CCTVViewer from './CCTVViewer.vue'
import SensorMonitor from './SensorMonitor.vue'


export default {
  components: {
    'cctv-viewer': CCTVViewer,
    SensorMonitor,
  },

}
</script>
