<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title> <strong> {{ title }} </strong> </b-card-title>
      <div class="d-flex justify-content-start">
        <feather-icon
          icon="EditIcon"
          size="18"
          class="cursor-pointer m-1"
          color="text-musted"
          @click="showModal"
        />
        <feather-icon
          v-model="isAlert"
          :icon="alertIcon"
          :color="alertColor"
          size="18"
          class="cursor-pointer m-1"
          @click="alertSetting"
        />
        <feather-icon
          icon="SettingsIcon"
          size="18"
          class="cursor-pointer m-1"
          color="text-musted"
        />
      </div>
    </b-card-header>

    <!-- body buttons -->
    <b-card-body class="text-center">

      <b-card-text class="pb-1">
        작동 시간
        <h4> <strong> 2021. 1. 17. 오후 4:12:34 </strong> </h4>
      </b-card-text>

      <b-form-group>
        <b-form-radio-group
          id="btn-radios-1"
          v-model="selectedButton"
          button-variant="outline-primary"
          :options="buttonOptions"
          buttons
        />
      </b-form-group>

      <b-button
        v-b-toggle.autoSettings
        variant="gradient-primary"
        size="sm"
        block
      >
        자동화 설정
      </b-button>

      <b-collapse
        id="autoSettings"
        class="mt-2"
      >
        <b-list-group
          class="d-flex bg-transparent"
          flush
        >
          <b-list-group-item>
            <span> hi </span>
          </b-list-group-item>
          <b-list-group-item>
            <span> hello </span>
          </b-list-group-item>
          <b-list-group-item>
            <span> yo </span>
          </b-list-group-item>
        </b-list-group>
      </b-collapse>

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
  BCard, BCardHeader, BCardTitle, BCardBody, BModal, BFormInput, BFormGroup, BFormRadioGroup, BCardText, BCollapse, BButton, VBToggle, BListGroup, BListGroupItem,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BModal,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BCardText,
    BCollapse,
    BButton,
    BListGroup,
    BListGroupItem,
  },
  directives: {
    'b-toggle': VBToggle,
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
    alertSetting() {
      this.isAlert = !this.isAlert
    },
  },
}
</script>
