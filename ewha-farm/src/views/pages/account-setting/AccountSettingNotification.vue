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
          id="accountSwitch1"
          :checked="localOptions.commentOnArticle"
          name="check-button"
          switch
          inline
        >
          <span>센서 알림</span>
        </b-form-checkbox>
      </b-col>
      <b-col
        cols="12"
        class="mb-2"
      >
        <b-form-checkbox
          id="accountSwitch2"
          :checked="localOptions.AnswerOnForm"
          name="check-button"
          switch
          inline
        >
          <span>자동 제어 알림</span>
        </b-form-checkbox>
      </b-col>
      <b-col
        cols="12"
        class="mb-2"
      >
        <b-form-checkbox
          id="accountSwitch3"
          :checked="localOptions.followMe"
          name="check-button"
          switch
          inline
        >
          <span>네트워크 연결 알림</span>
        </b-form-checkbox>
      </b-col>

      <!-- buttons -->
      <b-col cols="12">
        <b-button
          variant="primary"
          class="mr-1 mt-1"
        >
          설정 변경
        </b-button>
        <b-button
          type="reset"
          class="mt-1"
          variant="outline-secondary"
        >
          취소
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
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BCard,
    BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  props: {
    notificationData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localOptions: JSON.parse(JSON.stringify(this.notificationData)),
    }
  },
}
</script>
