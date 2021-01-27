<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title> <strong> {{ buttonItem.name }} </strong> </b-card-title>
      <div class="d-flex justify-content-start">
        <b-form-checkbox
          value="A"
          checked
        />
      </div>
    </b-card-header>

    <!-- body buttons -->
    <b-card-body class="text-center pb-1">
      <b-card-text>
        작동 시간
        <h4> <strong> {{ getDateString() }} </strong> </h4>
      </b-card-text>

      <b-alert
        v-if="isAuto"
        variant="dark"
        show
      >
        자동화 동작 중
      </b-alert>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardBody, BCardText, BAlert, BFormCheckbox,
} from 'bootstrap-vue'
import store from '@/store'
import { getDateString } from '@core/utils/utils'
import { heightFade } from '@core/directives/animations'
// import SettingModal from './SettingModal.vue'

export default {
  components: {
    BAlert,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardBody,
    BCardText,
    BFormCheckbox,
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
      inverterOptions: [
        { text: '동작', value: 'work' },
        { text: '중지', value: 'stop' },
      ],
      workingTime: '',
      title: '',
      name: this.buttonItem.name,
    }
  },
  setup(props) {
    const buttonItem = props.item
    const { command, commandValue, isAuto } = buttonItem
    const autoColor = isAuto ? 'text-danger' : 'text-musted'
    const selectedButton = command
    const sliderValue = commandValue
    return {
      buttonItem,
      isAuto,
      autoColor,
      selectedButton,
      sliderValue,
    }
  },
  watch: {
    sliderValue(newVal) {
      const param = {
        command: this.selectedButton,
        commandValue: newVal,
      }
      store.dispatch('button/command', { id: this.buttonItem._id, queryBody: param })
        .then(() => {
          this.updateData()
        }).catch(error => {
          console.log(error)
        })
    },
    selectedButton(newVal) {
      const param = {
        command: newVal,
        commandValue: this.selectedButton,
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

<style lang="scss">
@import '@core/scss/vue/libs/vue-slider.scss';
</style>
