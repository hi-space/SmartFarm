<template>
  <vx-card no-shadow>

    <!-- Info -->
    <vs-input class="w-full mb-base" label-placeholder="농장 이름" v-model="username"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="이름" v-model="name"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="핸드폰 번호" v-model="mobile"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="주소" v-model="address"></vs-input>
    <vs-input class="w-full mb-base" label-placeholder="축사 갯수" v-model="numOfStalls"></vs-input>
    
    <!-- <vs-alert icon-pack="feather" icon="icon-info" class="h-full my-4" color="warning">
      <span>Your account is not verified. <a href="#" class="hover:underline">Resend Confirmation</a></span>
    </vs-alert> -->

    <vs-input disabled class="w-full my-base" label-placeholder="담당자" v-model="manager"></vs-input>
    <vs-input disabled class="w-full my-base" label-placeholder="담당자 전화번호" v-model="manager_mobile"></vs-input>
    <vs-input disabled class="w-full my-base" label-placeholder="최초 가입일" v-model="joined"></vs-input>

    <!-- Save & Reset Button -->
    <div class="flex flex-wrap items-center justify-end">
      <vs-button class="ml-auto mt-2">정보 수정</vs-button>
    </div>
  </vx-card>
</template>

<script>
export default {
  data () {
    return {
      username: '농장 이름',
      name: this.$store.state.AppActiveUser.displayName,
      mobile: '01012345678',
      address: '서울시 용산구',
      numOfStalls: 5,
      
      manager: '담당자 이름',
      manager_mobile: '01012345678',
      joined: '2019-12-10',
    }
  },
  computed: {
    activeUserInfo () {
      return this.$store.state.AppActiveUser
    }
  }
}
</script>

