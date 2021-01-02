<template>
  <div class="row">
    <b-row>
      <b-col
        cols="6"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
      <b-col
        cols="6"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
    </b-row>
    <b-row>
      <b-col
        cols="6"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
      <b-col
        cols="6"
      >
        <cctv-player :src="cctv_url_1" />
      </b-col>
    </b-row>
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
      cctv_url_1: 'http://vjs.zencdn.net/v/oceans.mp4',
    }
  },
}
</script>
