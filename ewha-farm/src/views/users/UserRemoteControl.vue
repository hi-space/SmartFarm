<template>
  <div style="height: inherit; position: relative; width: 100%;">
    <div class="fixed">
      <cctv-viewer
        ref="cctvViewer"
        @updateUI="updateCCTVHeight()"
      />
      <b-card
        style="margin-top: 30px"
      >
        <b-row>
          <b-col
            sm="12"
            md="6"
            class="p-1"
          >
            <v-select
              v-model="selectedFarm"
              :options="farmOptions"
              placeholder="축사 선택"
              :clearable="false"
              :searchable="false"
            />
          </b-col>
          <b-col
            sm="12"
            md="6"
            class="p-1"
          >
            <v-select
              v-model="selectedButton"
              :options="buttonTypeOptions"
              placeholder="장치 선택"
              :clearable="false"
              :searchable="false"
            />
          </b-col>
        </b-row>
      </b-card>
    </div>
    <div :style="style">
      <vue-perfect-scrollbar
        :settings="perfectScrollbarSettings"
        class="scroll-area"
        :style="scrollStyle"
      >
        <remote-control
          ref="remoteControl"
        />
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import store from '@/store'
import { getUserData } from '@/auth/utils'
import CCTVViewer from './cctv-viewer/CCTVViewer.vue'
import RemoteControl from './remote-control/RemoteControl.vue'

export default {
  components: {
    'cctv-viewer': CCTVViewer,
    RemoteControl,
    vSelect,
    VuePerfectScrollbar,
    BCard,
    BRow,
    BCol,
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
  watch: {
    async selectedFarm() {
      await store.dispatch('button/fetchButtons', { userId: getUserData().id })
      this.buttonTypeOptions = await store.getters['button/getButtonTypes'](this.selectedFarm.value)
      this.selectedButton = []
      this.$refs.remoteControl.initValue()
      this.$refs.cctvViewer.getCCTV(this.selectedFarm.value)
      this.updateCCTVHeight()
    },
    async selectedButton() {
      this.$refs.remoteControl.getButtonList(this.selectedButton)
      this.$refs.remoteControl.initValue()
    },
  },
  created() {
    this.getFarmOptions()
  },
  methods: {
    async getFarmOptions() {
      await store.dispatch('farm/fetchFarms', { userId: getUserData().id })
      this.farmOptions = await store.getters['farm/getFarmSelect']
      if (this.farmOptions.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        this.selectedFarm = this.farmOptions[0]
      }
    },
    updateCCTVHeight() {
      setTimeout(() => {
        this.dy = parseFloat(getComputedStyle(document.querySelector('.fixed')).height)
        const contentHeight = parseFloat(getComputedStyle(document.querySelector('.content-overlay')).height)
        const navHeight = parseFloat(getComputedStyle(document.querySelector('.header-navbar-shadow')).height) + parseFloat(getComputedStyle(document.querySelector('.header-navbar-shadow')).padding)
        const footer = parseFloat(getComputedStyle(document.querySelector('.footer')).height)
        this.height = contentHeight - navHeight - footer - this.dy
      }, 1000)
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
