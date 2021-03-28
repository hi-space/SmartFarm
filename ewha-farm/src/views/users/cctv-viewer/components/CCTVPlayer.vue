<template>
  <div>
    <video-player
      ref="videoPlayer"
      class="vjs-custom-skin"
      :options="playerOptions"
      :playsinline="true"
      @ready="onPlayerReady()"
    />
  </div>
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
        autoplay: true,
        muted: true,
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
        },
        fluid: false,
        preload: 'auto',
        loop: false,
        width: `${parseFloat(getComputedStyle(document.querySelector('.app-content')).width)}` / 2 - `${parseFloat(getComputedStyle(document.querySelector('.app-content')).paddingRight)}` * 1.5,
        responsive: false,
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
    onPlayerReady() {
      this.player.play()
    },
    playVideo(source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source,
      }
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      this.player.load()
      // this.player.play()
    },
  },
}
</script>
