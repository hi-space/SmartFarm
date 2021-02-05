<template no-body>
  <!-- <video-player
    ref="videoPlayer"
    class="vjs-custom-skin"
    :options="playerOptions"
  /> -->
  <video-player
    ref="videoPlayer"
    class="vjs-custom-skin"
    :options="playerOptions"
    :playsinline="true"
    @ready="onPlayerReady"
  />
</template>

<script>
// import { videoPlayer } from 'vue-video-player'
import VideoPlayer from './VideoPlayer.vue'
import 'video.js/dist/video-js.css'

export default {
  components: {
    // videoPlayer,
    VideoPlayer,
  },
  props: {
    src: {
      type: String,
      default: 'https://220.71.87.34:4000/videos/output.m3u8',
    },
  },
  data() {
    return {
      playerOptions: {
        autoplay: 'muted',
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
        },
        fluid: false,
        preload: 'auto',
        loop: true,
        height: '300',
        responsive: 'true',
      },
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
  },
  mounted() {
    this.playVideo(this.src)
  },
  methods: {
    onPlayerReady(player) {
      console.log('player ready!', player)
      this.player.play()
    },
    playVideo(source) {
      console.log('playVideo!!!!!!!!!!!!!!!!!')
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source,
      }
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      this.player.load()
    },
  },
}
</script>
