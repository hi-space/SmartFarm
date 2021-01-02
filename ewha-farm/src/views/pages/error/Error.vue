<template>
  <!-- Error page-->
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <logo />
      <h2 class="brand-text text-primary ml-1">
        Ewha Farm
      </h2>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <!-- image -->
        <b-img
          fluid
          :src="imgUrl"
          alt="Error page"
        />

        <h1 class="mt-4 font-weight-bolder">
          페이지를 찾을 수 없습니다
        </h1>

        <b-button
          variant="primary"
          class="mt-2 btn-sm-block"
          :to="{path:'/'}"
        >
          돌아가기
        </b-button>

      </div>
    </div>
  </div>
<!-- / Error page-->
</template>

<script>
/* eslint-disable global-require */
import { BLink, BButton, BImg } from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'

export default {
  components: {
    Logo,
    BLink,
    BButton,
    BImg,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/404.png'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/error-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
