<template>
  <div v-if="reseted">
    <video
      ref="video"
      class="video-js"
    >
      <track
        v-for="(crtTrack,index) in trackList"
        :key="index"
        :kind="crtTrack.kind"
        :label="crtTrack.label"
        :src="crtTrack.src"
        :srcLang="crtTrack.srcLang"
        :default="crtTrack.default"
      >
    </video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import _videojs from 'video.js'

const videojs = window.videojs || _videojs

export default {
  name: 'Videoplayer',
  props: {
    crossOrigin: {
      type: String,
      default: '',
    },
    playsinline: {
      type: Boolean,
      default: false,
    },
    customEventName: {
      type: String,
      default: 'statechanged',
    },
    options: {
      type: Object,
      required: true,
    },
    events: {
      type: Array,
      default: () => [],
    },
    globalOptions: {
      type: Object,
      default: () => ({
        autoplay: true,
        controls: true,
        language: 'zh',
        inactivityTimeout: 0,
        preload: 'auto',
        fluid: true,
        techOrder: ['html5'],
        plugins: {},
      }),
    },
    globalEvents: {
      type: Array,
      default: () => [],
    },
    trackList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      player: null,
      reseted: true,
    }
  },
  watch: {
    options: {
      deep: true,
      handler(options) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        })
      },
    },
  },
  mounted() {
    if (!this.player) {
      this.initialize()
    }
  },
  beforeDestroy() {
    if (this.player) {
      this.dispose()
    }
  },
  methods: {
    initialize() {
      const self = this
      const videoObj = this.$refs.video
      // videojs options
      const videoOptions = { ...this.globalOptions, ...this.options }
      // ios fullscreen
      if (this.playsinline) {
        videoObj.setAttribute('playsinline', this.playsinline)
        videoObj.setAttribute('webkit-playsinline', this.playsinline)
        videoObj.setAttribute('x5-playsinline', this.playsinline)
        videoObj.setAttribute('x5-video-player-type', 'h5')
        videoObj.setAttribute('x5-video-player-fullscreen', false)
      }
      // cross origin
      if (this.crossOrigin !== '') {
        videoObj.crossOrigin = this.crossOrigin
        videoObj.setAttribute('crossOrigin', this.crossOrigin)
      }
      // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__
      }
      // emit event
      const emitPlayerState = (event, value) => {
        if (event) {
          this.$emit(event, this.player)
        }
        if (value) {
          this.$emit(this.customEventName, { [event]: value })
        }
      }
      // player
      // eslint-disable-next-line func-names
      this.player = videojs(videoObj, videoOptions, function () {
        // events
        const DEFAULT_EVENTS = [
          'loadeddata',
          'canplay',
          'canplaythrough',
          'play',
          'pause',
          'waiting',
          'playing',
          'ended',
          'error',
        ]
        const events = DEFAULT_EVENTS.concat(self.events).concat(
          self.globalEvents,
        )

        // watch events
        const onEdEvents = {}
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < events.length; i++) {
          if (
            typeof events[i] === 'string' && onEdEvents[events[i]] === undefined
          ) {
            (event => {
              onEdEvents[event] = null
              this.on(event, () => {
                emitPlayerState(event, true)
              })
            })(events[i])
          }
        }
        // player readied
        self.$emit('ready', this)
      })
    },
    dispose(callback) {
      if (this.player && this.player.dispose) {
        if (this.player.techName_ !== 'Flash') {
          // eslint-disable-next-line no-unused-expressions
          this.player.pause && this.player.pause()
        }
        this.player.dispose()
        this.player = null
        this.$nextTick(() => {
          this.reseted = false
          this.$nextTick(() => {
            this.reseted = true
            this.$nextTick(() => {
              // eslint-disable-next-line no-unused-expressions
              callback && callback()
            })
          })
        })
      }
    },
  },
}

</script>

<style scoped>

</style>
