<template>
  <!-- <video-player
    ref="videoPlayer"
    class="vjs-custom-skin"
    :options="playerOptions"
  /> -->
  <video-player
    ref="videoPlayer"
    class="vjs-custom-skin"
    :options="playerOptions"
    @play="onPlayerPlay($event)"
    @ready="onPlayerReady($event)"
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
  // props: {
  //   src: {
  //     type: String,
  //     default: 'http://vjs.zencdn.net/v/oceans.mp4',
  //   },
  // },
  data() {
    return {
      playerOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
      },
    }
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player
    },
  },
  mounted() {
    console.log('mounted')
    const src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    this.playVideo(src)
  },
  methods: {
    onPlayerPlay(player) {
      console.log('player play!', player)
    },
    onPlayerReady(player) {
      console.log('player ready!', player)
      this.$refs.videoPlayer.player.play()
    },
    playVideo(source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source,
      }
      this.$refs.videoPlayer.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.$refs.videoPlayer.player.src(video)
      // this.player.load()
      this.$refs.videoPlayer.player.play()
    },
  },
}
</script>
