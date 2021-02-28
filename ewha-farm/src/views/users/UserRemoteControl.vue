<template>
  <div>
    <div class="fixed container">
      <cctv-viewer
        ref="cctvViewer"
        @updateUI="updateCCTVHeight()"
      />
    </div>
    <div :style="style">
      <hr class="m-2">
      <remote-control
        @updateFarm="updateFarm"
      />
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
    this.updateCCTVHeight()
  },
  methods: {
    updateCCTVHeight() {
      setTimeout(() => {
        this.dy = parseFloat(getComputedStyle(document.querySelector('.fixed')).height)
      }, 1000)
    },
    updateFarm(farmId) {
      this.$refs.cctvViewer.getCCTV(farmId)
      this.updateCCTVHeight()
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
}

</style>
