<template>
  <swiper
    ref="cctvSwiper"
    class="swiper"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(data,index) in cctv"
      :key="index"
    >
      <div>
        <cctv-player
          :src="data.relayUrl"
        />
      </div>
    </swiper-slide>

    <div
      slot="button-next"
      class="swiper-button-next"
    />
    <div
      slot="button-prev"
      class="swiper-button-prev"
    />
    <div
      slot="pagination"
      class="swiper-pagination"
    />
  </swiper>
</template>

<script>
import { getUserData } from '@/auth/utils'
import store from '@/store'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import CCTVPlayer from './components/CCTVPlayer.vue'

export default {
  components: {
    Swiper,
    SwiperSlide,
    'cctv-player': CCTVPlayer,
  },
  data() {
    return {
      cctv: [],
      swiperOption: {
        slidesPerView: 2,
        slidesPerColumn: 2,
        slidePerGroup: 2,
        spaceBetween: 0,
        slidesPerGroupSkip: 2,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
    }
  },
  computed: {
    swiper() {
      return this.$refs.cctvSwiper.swiper
    },
  },
  methods: {
    async getCCTV(farmId) {
      this.cctv = []
      const result = await store.dispatch('cctv/fetchCCTVs',
        { userId: getUserData().id, farmId })
      this.cctv = result.data
      this.$emit('updateUI')
    },
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  ::v-deep .swiper-wrapper {
    flex-direction: row !important;
  }
}
</style>
