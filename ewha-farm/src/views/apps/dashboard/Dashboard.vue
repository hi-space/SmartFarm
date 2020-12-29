<template>
  <div class="vx-row">
    <div class="vx-col w-full mb-base px-10">
      <cctv-viewer></cctv-viewer>
    </div>
    
    <div class="vx-col w-full">
      <sensor-monitor></sensor-monitor>
    </div>
  </div>
</template>

<script>
import VxCard from '../../components/vx-card/VxCard.vue'
import CCTVViewer from './CCTVViewer.vue'
import SensorMonitor from './SensorMonitor.vue'

export default {
  components: {
    'cctv-viewer': CCTVViewer,
    SensorMonitor,
    VxCard,
  },

}
</script>