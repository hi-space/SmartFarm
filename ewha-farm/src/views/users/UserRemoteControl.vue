<template>
  <div>
    <keep-alive>
      <div class="fixed container">
        <cctv-viewer />
      </div>
    </keep-alive>
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
      console.log(this.dy)
      return {
        'padding-top': `${this.dy}px`,
        top: `${this.dy}px`,
      }
    },
  },
  mounted() {
    this.dy = parseFloat(getComputedStyle(document.querySelector('.swiper-container')).height) / 2 + 200
  },
}
</script>

<style>
.fixed {
  position: fixed;
  display: inline-block;
  z-index: 1000;
  width: 100% !important;
  /* height: 100% !important; */
}

.spacer {
  position: fixed;
  z-index: 9999;
}

</style>
