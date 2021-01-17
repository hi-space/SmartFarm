/* eslint-disable quote-props */
<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title> <strong> {{ title }} </strong> </b-card-title>
      <div class="d-flex justify-content-start">
        <feather-icon
          icon="EditIcon"
          size="18"
          class="cursor-pointer m-1"
          @click="showModal"
        />
        <feather-icon
          v-model="isAlert"
          :icon="alertIcon"
          :color="alertColor"
          size="18"
          class="cursor-pointer m-1"
          @click="toggleAlert"
        />
        <feather-icon
          v-model="isAuto"
          icon="RepeatIcon"
          :color="autoColor"
          size="18"
          class="cursor-pointer m-1"
          @click="toggleAuto"
        />
      </div>
    </b-card-header>

    <!-- body buttons -->
    <b-card-body class="text-center pb-1">
      <b-card-text>
        작동 시간
        <h4> <strong> 2021. 1. 17. 오후 4:12:34 </strong> </h4>
      </b-card-text>

      <b-form-group>
        <b-form-radio-group
          v-model="selectedButton"
          button-variant="outline-primary"
          :options="buttonOptions"
          buttons
          class="p-1"
        />
      </b-form-group>

      <b-alert
        variant="secondary"
        show
      >
        자동화 동작 중
      </b-alert>
      <automatic-list />
    </b-card-body>

    <!-- modal -->
    <b-modal
      ref="modifyNameModal"
      title="변경할 이름을 입력해주세요"
      ok-title="수정"
      cancel-variant="outline-secondary"
      centered
      @ok="modifyName"
    >
      <form>
        <b-form-group
          label="장치 이름"
          label-for="name-input"
        >
          <b-form-input
            id="name-input"
            v-model="name"
            required
          />
        </b-form-group>
      </form>
    </b-modal>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BModal, BFormInput, BFormGroup, BFormRadioGroup, BCardText, BAlert,
} from 'bootstrap-vue'
import AutomaticList from './AutomaticList.vue'

export default {
  components: {
    BAlert,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BModal,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BCardText,
    AutomaticList,
  },
  props: {
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      modifyNameModal: false,
      isAlert: true,
      alertIcon: 'BellIcon',
      alertColor: 'text-warning',
      isAuto: true,
      autoColor: 'text-danger',
      name: this.title,
      selectedButton: 'stop',
      buttonOptions: [
        { text: '열기', value: 'open' },
        { text: '중지', value: 'stop' },
        { text: '닫기', value: 'close' },
      ],
    }
  },
  watch: {
    isAlert() {
      this.alertIcon = this.isAlert ? 'BellIcon' : 'BellOffIcon'
      this.alertColor = this.isAlert ? 'text-warning' : 'text-musted'
    },
    isAuto() {
      this.autoColor = this.isAuto ? 'text-danger' : 'text-musted'
    },
    selectedButton() {
      console.log(this.selectedButton)
    },
  },
  methods: {
    showModal() {
      this.$refs.modifyNameModal.show()
    },
    modifyName() {
      console.log(this.name)
    },
    toggleAlert() {
      this.isAlert = !this.isAlert
    },
    toggleAuto() {
      this.isAuto = !this.isAuto
    },
  },
}
</script>
