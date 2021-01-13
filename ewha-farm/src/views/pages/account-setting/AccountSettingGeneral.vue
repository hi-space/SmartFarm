<template>
  <b-card>

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="이름"
            label-for="name"
          >
            <b-form-input
              v-model="user.name"
              name="name"
              placeholder="Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="전화번호"
            label-for="phone"
          >
            <b-form-input
              v-model="user.phone"
              name="phone"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="농장 주소"
            label-for="address"
          >
            <b-form-input
              v-model="user.address"
              name="address"
              placeholder="Address"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1 float-right"
            @click="updateInfo"
          >
            정보 수정
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'

import userStoreModule from '@/views/admin/userStoreModule'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
  },
  directives: {
    Ripple,
  },
  props: {
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      user: this.userInfo,
    }
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
  },
  methods: {
    updateInfo() {
      const body = {
        'userInfo.name': this.user.name,
        'userInfo.phone': this.user.phone,
        'userInfo.address': this.user.address,
      }

      store.dispatch('app-user/updateUser', { id: this.user.id, queryBody: body })
        .then(response => {
          console.log(response)
          this.$bvModal.msgBoxOk('수정이 완료됐습니다').then({})
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
