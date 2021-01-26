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
    switchPlayer() {
      this.playVideo(this.src)
    },
    onPlayerPause(player) {
      console.log('player pause!', player)
    },
    onPlayerEnded(player) {
      console.log('player ended!', player)
    },
    onPlayerLoadeddata(player) {
      console.log('player Loadeddata!', player)
    },
    onPlayerWaiting(player) {
      console.log('player Waiting!', player)
    },
    onPlayerPlaying(player) {
      console.log('player Playing!', player)
    },
    onPlayerTimeupdate(player) {
      console.log('player Timeupdate!', player.currentTime())
    },
    onPlayerCanplay(player) {
      console.log('player Canplay!', player)
    },
    onPlayerCanplaythrough(player) {
      console.log('player Canplaythrough!', player)
    },
    // or listen state event
    playerStateChanged(playerCurrentState) {
      console.log('player current update state', playerCurrentState)
    },
    // player is ready
    playerReadied(player) {
      // seek to 10s
      // player.currentTime(10)
      console.log('example 01: the player is readied', player)
    },
  },
}
</script>
