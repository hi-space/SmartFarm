<template>
  <div>
    <!-- <cctv-viewer /> -->
    <cctv-viewer />
    <hr class="m-2">
    <remote-control />
  </div>
</template>

<script>
// import {
//   BRow,
// } from 'bootstrap-vue'

import CCTVViewer from './cctv-viewer/CCTVViewer.vue'
import RemoteControl from './remote-control/RemoteControl.vue'

export default {
  components: {
    // BRow,
    'cctv-viewer': CCTVViewer,
    RemoteControl,
  },
}
</script>
