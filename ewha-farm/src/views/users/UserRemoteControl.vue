<template>
  <div>
    <div class="fixed container">
      <cctv-viewer
        @updateUI="updateLayout()"
      />
    </div>
    <div :style="style">
      <hr class="m-2">
      <remote-control />
    </div>
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
  data() {
    return {
      dy: 50,
    }
  },
  computed: {
    style() {
      return {
        'padding-top': `${this.dy}px`,
        'z-index': 11,
      }
    },
  },
  updated() {
    this.dy = parseFloat(getComputedStyle(document.querySelector('.fixed')).height)
  },
  methods: {
    updateLayout() {
      this.dy = parseFloat(getComputedStyle(document.querySelector('.fixed')).height)
    },
  },
}
</script>

<style>
.fixed {
  position: fixed;
  display: block;
  z-index: 10;
  width: 100% !important;
  /* height: 100% !important; */
}

</style>
