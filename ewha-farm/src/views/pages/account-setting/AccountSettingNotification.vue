<template>
  <b-card>
    <b-row>
      <h6 class="section-label mx-1 mb-2">
        알림 설정
      </h6>

      <b-col
        cols="12"
        class="mb-2"
      >
        <b-form-checkbox
          v-model="userData.pushSetting.network"
          switch
          inline
        >
          <span>네트워크 알림</span>
        </b-form-checkbox>
      </b-col>

      <b-col
        cols="12"
        class="mb-2"
      >
        <b-form-checkbox
          v-model="userData.pushSetting.automatic"
          switch
          inline
        >
          <span>자동제어 알림</span>
        </b-form-checkbox>
      </b-col>

      <b-col
        cols="12"
        class="mb-2"
      >
        <b-form-checkbox
          v-model="userData.pushSetting.sensor"
          switch
          inline
        >
          <span>센서 알림</span>
        </b-form-checkbox>
      </b-col>

      <!-- buttons -->
      <b-col cols="12">
        <b-button
          variant="primary"
          class="mr-1 mt-1 float-right"
          @click="updateInfo"
        >
          설정 변경
        </b-button>
      </b-col>
      <!--/ buttons -->
    </b-row>
  </b-card>
</template>

<script>
import {
  BButton, BRow, BCol, BCard, BFormCheckbox,
} from 'bootstrap-vue'
import store from '@/store'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BCard,
    BFormCheckbox,
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
      console.log(this.userData)
      store.dispatch('users/updateUser', { id: this.userId, queryBody: this.userData })
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
