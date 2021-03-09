<template>
  <div style="height: inherit; position: relative; width: 100%;">
    <div class="fixed">
      <cctv-viewer
        ref="cctvViewer"
        @updateUI="updateCCTVHeight()"
      />
    </div>
    <div :style="style">
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="scroll-area"
        :style="scrollStyle"
      >
        <remote-control
          ref="remoteControl"
          @updateFarm="updateFarm"
        />
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import CCTVViewer from './cctv-viewer/CCTVViewer.vue'
import RemoteControl from './remote-control/RemoteControl.vue'

export default {
  components: {
    'cctv-viewer': CCTVViewer,
    RemoteControl,
    VuePerfectScrollbar,
  },
  data() {
    return {
      selectedFarm: [],
      selectedButton: [],
      farmOptions: [],
      buttonTypeOptions: [],

      dy: 50,
      height: 0,
      perfectScrollbarSettings: {
        scrollYMarginOffset: 0,
        suppressScrollX: true,
      },
    }
  },
  computed: {
    style() {
      return {
        'z-index': 11,
      }
    },
    scrollStyle() {
      return {
        height: `${this.height}px`,
      }
    },
  },
  methods: {
    updateCCTVHeight() {
      setTimeout(() => {
        this.dy = parseFloat(getComputedStyle(document.querySelector('.fixed')).height)
        const contentHeight = parseFloat(getComputedStyle(document.querySelector('.content-overlay')).height)
        const navHeight = parseFloat(getComputedStyle(document.querySelector('.header-navbar-shadow')).height) + parseFloat(getComputedStyle(document.querySelector('.header-navbar-shadow')).padding)
        const footer = parseFloat(getComputedStyle(document.querySelector('.footer')).height)
        this.height = contentHeight - navHeight - footer - this.dy
      }, 1000)
    },

    updateFarm(farmId) {
      this.$refs.cctvViewer.getCCTV(farmId)
      this.updateCCTVHeight()
    },
  },
}
</script>

<style scoped>
.fixed {
  /* position: fixed; */
  display: block;
  z-index: 10;
  width: 100% !important;
}

.scroll-area {
  position: relative;
  margin: auto;
  width: 100% !important;
}

</style>
