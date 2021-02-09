<template>
  <swiper
    class="swiper"
    :options="swiperOption"
  >
    <swiper-slide
      v-for="(data,index) in cctv"
      :key="index"
    >
      <cctv-player :src="data.rtspUrl" />
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
import CCTVPlayer from './cctv-player/CCTVPlayer.vue'

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
        spaceBetween: 0,
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
  created() {
    this.getCCTV()
  },
  methods: {
    async getCCTV() {
      const result = await store.dispatch('cctv/fetchCCTVs',
        { userId: getUserData().id })
      this.cctv = result.data
      console.log(result.data)
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
