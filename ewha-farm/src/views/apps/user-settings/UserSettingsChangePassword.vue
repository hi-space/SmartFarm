<template>
  <vx-card title="비밀번호 변경" no-shadow>

    <vs-input class="w-full mb-base" type="password" v-validate="'required|min:4|max:12'" label-placeholder="기존 비밀번호" v-model="old_password" />
     <span class="text-danger text-sm">{{ errors.first('old_password') }}</span>
    <vs-input class="w-full mb-base" type="password" v-validate="'required|min:4|max:12'" ref="new_password" label-placeholder="새 비밀번호" v-model="new_password" />
    <span class="text-danger text-sm">{{ errors.first('new_password') }}</span>
    <vs-input class="w-full mb-base" type="password" v-validate="'required|min:4|max:12'" data-vv-as="new_password" label-placeholder="새 비밀번호 확인" v-model="confirm_new_password" />
    <span class="text-danger text-sm">{{ errors.first('confirm_new_password') }}</span>

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
