<template>
  <video-player
    ref="videoPlayer"
    class="vjs-custom-skin"
    :options="playerOptions"
    :playsinline="false"
  />
</template>

<script>
import VideoPlayer from './VideoPlayer.vue'
import 'video.js/dist/video-js.css'

export default {
  components: {
    VideoPlayer,
  },
  props: {
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      playerOptions: {
        autoplay: 'muted',
        controls: false,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
        },
        fluid: false,
        preload: 'auto',
        loop: false,
        width: `${parseFloat(getComputedStyle(document.querySelector('.app-content')).width) / 2}` - 28,
        // height: 240,
        responsive: true,
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
    playVideo(source) {
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
