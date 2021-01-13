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
              v-model="userData.userInfo.name"
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
              v-model="userData.userInfo.phone"
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
              v-model="userData.userInfo.address"
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
    userId: {
      type: String,
      required: true,
    },
    userData: {
      type: Object,
      required: true,
    },
  },
  methods: {
    updateInfo() {
      console.log(this.userId)
      console.log(this.userData)
      store.dispatch('app-user/updateUser', { id: this.userId, queryBody: this.userData })
        .then(() => {
          this.$bvModal.msgBoxOk('개인 정보가 수정되었습니다', {
            title: '개인 정보 수정',
            centered: true,
          }).then({})
        })
        .catch(error => {
          console.log(error)
          this.$bvModal.msgBoxOk('개인 정보 수정이 실패했습니다', {
            title: '개인 정보 수정',
            centered: true,
          }).then({})
        })
    },
  },
}
</script>
