<template>
  <div>
    <b-row>
      <b-col
        md="6"
        sm="12"
      >
        <cctv-player />
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
      cctv_url_1: 'https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8',
    }
  },
}
</script>
