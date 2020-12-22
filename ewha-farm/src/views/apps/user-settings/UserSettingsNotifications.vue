<template>
  <vx-card title="알림 설정" no-shadow>
    <div class="mb-base">
      <div class="flex items-center mb-4">
        <vs-switch v-model="all_alert" />
        <span class="ml-4">전체 알림 받기</span>
      </div>
    </div>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end mt-base">
      <vs-button class="ml-auto mt-2">설정 완료</vs-button>
    </div>

  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      all_alert: true,
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
