<template>
  <div>
    <b-row>
      <b-col
        md="6"
        sm="6"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
      <b-col
        md="6"
        sm="6"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
      <!-- <b-col
        md="6"
        sm="12"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col> -->
    </b-row>
    <!-- <b-row>
      <b-col
        md="6"
        sm="12"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
      <b-col
        md="6"
        sm="12"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
    </b-row> -->
  </div>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'

import CCTVPlayer from './cctv-player/CCTVPlayer.vue'

export default {
  components: {
    BCol,
    BRow,
    'cctv-player': CCTVPlayer,
  },
  data() {
    return {
      // cctv_url_1: 'http://localhost:4000/videos/output.m3u8',
      // cctv_url_1: 'http://192.168.0.25:4000/videos/output.m3u8',
      cctv_url_1: 'https://220.71.87.34:4000/videos/output.m3u8',
    }
  },
}
</script>
