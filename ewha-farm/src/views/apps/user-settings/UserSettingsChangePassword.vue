<template>
  <vx-card no-shadow>

    <vs-input class="w-full mb-base" label-placeholder="Old Password" v-model="old_password" />
    <vs-input class="w-full mb-base" label-placeholder="New Password" v-model="new_password" />
    <vs-input class="w-full mb-base" label-placeholder="Confirm Password" v-model="confirm_new_password" />

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">Save Changes</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      old_password: '',
      new_password: '',
      confirm_new_password: ''
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>
