<template>
  <vx-card no-shadow>

    <div class="flex flex-wrap justify-between items-center mb-8">
      <div>
        <p>Account is connected with Google.</p>
        <p class="font-medium mb-4">john@gmail.com</p>
      </div>
      <vs-button type="border" color="danger">Disconnect</vs-button>
    </div>

    <div class="flex flex-wrap justify-between items-center mb-base">
      <div>
        <p>Account is connected with facebook.</p>
        <p class="font-medium mb-4">@pixinvents</p>
      </div>
      <vs-button type="border" color="danger">Disconnect</vs-button>
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
