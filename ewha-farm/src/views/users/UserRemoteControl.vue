<template>
  <div class="no-scroll">
    <keep-alive>
      <div class="fixed">
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
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted() {
    this.dy = parseFloat(getComputedStyle(document.querySelector('.fixed')).height) / 2
  },
  methods: {
    handleScroll(event) {
      // this.dy = window.top.scrollY
      console.log(window.top.scrollY)
    },
  },
}
</script>

<style>
.fixed {
  position: fixed;
  display: inline-block;
  /* z-index: 9999; */
  width: 100% !important;
  height: 100% !important;
}

.spacer {
  position: fixed;
  /* z-index: 1000; */
}

</style>
