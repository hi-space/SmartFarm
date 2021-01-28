<template>
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
          alt="Not authorized page"
        />

        <h1 class="mt-4 font-weight-bolder">
          권한이 없습니다
        </h1>
        <h4>
          관리자에게 문의해주세요
        </h4>

        <b-button
          variant="outline-primary"
          class="mt-3 btn-sm-block"
          :to="backRoute()"
        >
          돌아가기
        </b-button>

        <b-button
          variant="primary"
          class="mt-1 btn-sm-block"
          @click="loginRoute()"
        >
          로그인으로 돌아가기
        </b-button>

      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue'
import Logo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser, logout } from '@/auth/utils'

export default {
  components: {
    BLink, BImg, BButton, Logo,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.png'),
    }
  },
  computed: {
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  methods: {
    backRoute() {
      const user = JSON.parse(localStorage.getItem('userData'))
      return getHomeRouteForLoggedInUser(user ? user.role : null,
        user ? user.status : null)
    },
    loginRoute() {
      logout()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-misc.scss';
</style>
