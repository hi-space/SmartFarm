<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab active>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">개인정보</span>
      </template>

      <account-setting-general
        :user-info="userData"
      />
    </b-tab>
    <!--/ general tab -->

    <!-- notification -->
    <b-tab>

      <!-- title -->
      <!-- <template #title>
        <feather-icon
          icon="BellIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">알림 설정</span>
      </template> -->

      <!-- <account-setting-notification
        v-if="userData.notification"
        :notification-data="userData.notification"
      /> -->
    </b-tab>
  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import { getUserData } from '@/auth/utils'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
// import AccountSettingNotification from './AccountSettingNotification.vue'

export default {
  components: {
    BTabs,
    BTab,
    AccountSettingGeneral,
    // AccountSettingNotification,
  },
  setup() {
    const userData = getUserData()
    console.log(userData)
    // this.$http.get('/account-setting/data').then(res => { this.userData = res.data })
    return {
      userData,
    }
  },
}
</script>
