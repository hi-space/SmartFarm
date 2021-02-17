<template>
  <div>
    <keep-alive>
      <cctv-viewer />
    </keep-alive>
    <hr class="m-2">
    <remote-control />
  </div>
</template>

<script>
import CCTVViewer from './cctv-viewer/CCTVViewer.vue'
import RemoteControl from './remote-control/RemoteControl.vue'

export default {
  components: {
    'cctv-viewer': CCTVViewer,
    RemoteControl,
  },
}
</script>
