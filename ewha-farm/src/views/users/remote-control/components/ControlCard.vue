<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title> <strong> {{ buttonItem.name }} </strong> </b-card-title>
      <div class="d-flex justify-content-start">
        <feather-icon
          icon="EditIcon"
          size="18"
          class="cursor-pointer m-1"
          @click="showModal"
        />
        <!-- <feather-icon
          v-model="isAlert"
          :icon="alertIcon"
          :color="alertColor"
          size="18"
          class="cursor-pointer m-1"
          @click="toggleAlert"
        /> -->
        <feather-icon
          v-model="isAuto"
          icon="RepeatIcon"
          :color="autoColor"
          size="18"
          class="cursor-pointer m-1"
          @click="toggleAuto"
        />
        <!-- <setting-modal
          :button-id="buttonItem._id"
          @submit="updateSettings()"
        /> -->
      </div>
    </b-card-header>

    <!-- body buttons -->
    <b-card-body class="text-center pb-1">
      <b-card-text>
        작동 시간
        <h4> <strong> {{ getDateString() }} </strong> </h4>
      </b-card-text>

      <b-form-group>
        <b-form-radio-group
          v-if="!isAuto"
          v-model="selectedButton"
          button-variant="outline-primary"
          :options="buttonOptions"
          buttons
          class="p-1 d-flex"
        />
      </b-form-group>

      <b-alert
        v-if="isAuto"
        variant="dark"
        show
      >
        자동화 동작 중
      </b-alert>
      <automatic-list
        ref="automaticList"
        :button-id="buttonItem._id"
      />
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
import store from '@/store'
import { getDateString } from '@core/utils/utils'
import { heightFade } from '@core/directives/animations'
import AutomaticList from './AutomaticList.vue'
// import SettingModal from './SettingModal.vue'

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
    // SettingModal,
  },
  directives: {
    'height-fade': heightFade,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      modifyNameModal: false,
      isAlert: true,
      alertIcon: 'BellIcon',
      alertColor: 'text-warning',
      buttonOptions: [
        { text: '열기', value: 'open' },
        { text: '중지', value: 'stop' },
        { text: '닫기', value: 'close' },
      ],
      workingTime: '',
      title: '',
      name: this.buttonItem.name,
    }
  },
  setup(props) {
    const buttonItem = props.item
    const { command, isAuto } = buttonItem
    const autoColor = isAuto ? 'text-danger' : 'text-musted'
    const selectedButton = command
    return {
      buttonItem,
      isAuto,
      autoColor,
      selectedButton,
    }
  },
  watch: {
    selectedButton(newVal) {
      const param = {
        command: newVal,
      }

      store.dispatch('button/command', { id: this.buttonItem._id, queryBody: param })
        .then(() => {
          this.updateData()
        }).catch(error => {
          console.log(error)
        })
    },
  },
  methods: {
    updateSettings() {
      this.$refs.automaticList.initSettings()
    },
    getDateString() {
      return getDateString(this.buttonItem.workingTime)
    },
    showModal() {
      this.$refs.modifyNameModal.show()
    },
    updateData() {
      store.dispatch('button/fetchButton', { id: this.buttonItem._id })
        .then(response => {
          this.buttonItem = response.data
          this.$forceUpdate()
        })
        .catch(err => {
          console.log(err)
        })
    },
    modifyName() {
      store.dispatch('button/updateButton',
        {
          id: this.buttonItem._id,
          queryBody: {
            name: this.name,
          },
        })
        .then(() => {
          this.updateData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    toggleAlert() {
      this.isAlert = !this.isAlert
      this.alertIcon = this.isAlert ? 'BellIcon' : 'BellOffIcon'
      this.alertColor = this.isAlert ? 'text-warning' : 'text-musted'
    },
    toggleAuto() {
      this.isAuto = !this.isAuto
      this.autoColor = this.isAuto ? 'text-danger' : 'text-musted'

      store.dispatch('button/updateButton',
        {
          id: this.buttonItem._id,
          queryBody: {
            isAuto: this.isAuto,
          },
        })
        .then(() => {
          this.updateData()
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>
