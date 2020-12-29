<template>
  <vs-tabs :position="isSmallerScreen ? 'top' : 'left'" class="tabs-shadow-none" id="profile-tabs" :key="isSmallerScreen">

    <!-- GENERAL -->
    <vs-tab icon-pack="feather" icon="icon-user" :label="!isSmallerScreen ? '개인정보' : '정보'">
      <div class="tab-general md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-general />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-lock" :label="!isSmallerScreen ? '비밀번호 변경' : '비밀번호'">
      <div class="tab-change-pwd md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-change-password />
      </div>
    </vs-tab>
    <vs-tab icon-pack="feather" icon="icon-bell" :label="!isSmallerScreen ? '알림 설정' : '알림'">
      <div class="tab-text md:ml-4 md:mt-0 mt-4 ml-0">
        <settings-notifications />
      </div>
    </vs-tab>
  </vs-tabs>
</template>

<script>
import SettingsGeneral from './SettingsGeneral.vue'
import SettingsChangePassword from './SettingsChangePassword.vue'
import SettingsNotifications from './SettingsNotifications.vue'

export default {
  components: {
    SettingsGeneral,
    SettingsChangePassword,
    SettingsNotifications
  },
  data () {
    return {

    }
  },
  computed: {
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    }
  }
}
</script>

<style lang="scss">
#profile-tabs {
  .vs-tabs--content {
    padding: 0;
  }
}
</style>
