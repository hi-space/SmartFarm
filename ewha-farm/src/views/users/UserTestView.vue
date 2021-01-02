<template>
  <div class="row">
    <b-row>
      <b-col>
        <cctv-viewer />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow,
  BCol,
} from 'bootstrap-vue'

import CCTVPlayer from './monitoring/CCTVViewer.vue'

export default {
  components: {
    BRow,
    BCol,
    'cctv-viewer': CCTVPlayer,
  },
}
</script>
