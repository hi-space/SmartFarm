<template>
  <div>
    <!-- <cctv-viewer /> -->
    <keep-alive>
      <cctv-viewer />
    </keep-alive>
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
