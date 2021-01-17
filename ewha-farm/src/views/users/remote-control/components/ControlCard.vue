<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title> {{ title }} </b-card-title>
      <div class="d-flex justify-content-start">
        <feather-icon
          icon="EditIcon"
          size="18"
          class="text-muted cursor-pointer m-1"
          @click="modifyNameModal = true"
        />
        <feather-icon
          v-model="isAlert"
          :icon="alertIcon"
          size="18"
          class="text-muted cursor-pointer m-1"
          @click="alertSetting"
        />
        <feather-icon
          icon="SettingsIcon"
          size="18"
          class="text-muted cursor-pointer m-1"
        />
      </div>
    </b-card-header>
    <b-card-body>
      <span> Hello </span>
    </b-card-body>

    <!-- modal -->
    <b-modal
      v-model="modifyNameModal"
      title="변경할 이름을 입력해주세요"
      ok-title="수정"
      cancel-variant="outline-secondary"
      centered
      @ok="modifyName"
    >
      <form
        ref="form"
      >
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
  BCard, BCardHeader, BCardTitle, BCardBody, BModal, BFormInput, BFormGroup,
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
      isAlert: false,
      alertIcon: 'BellIcon',
      name: this.title,
    }
  },
  computed: {

  },
  watch: {
    isAlert() {
      this.alertIcon = this.isAlert ? 'BellIcon' : 'BellOffIcon'
    },
  },
  methods: {
    modifyName() {
      console.log(this.name)
    },
    alertSetting() {
      this.isAlert = !this.isAlert
    },
  },
}
</script>
