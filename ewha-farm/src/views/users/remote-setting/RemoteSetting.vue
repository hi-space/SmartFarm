<template>
  <b-card>
    <div id="videoWrapper" />
    <b-card-title class="text-center">
      <h3> <strong> 자동화 설정 </strong> </h3>
    </b-card-title>
    <b-row>
      <b-col cols="12">
        <b-form-group
          class="text-center p-1"
        >
          <b-form-checkbox-group
            v-model="selectedDay"
            :options="dayOptions"
            size="sm"
            buttons
            button-variant="outline-primary"
          />
        </b-form-group>
      </b-col>

      <b-col>
        <!-- select button -->
        <div
          class="text-center"
        >
          <hr>
          <v-select
            v-model="selectedButtonType"
            :options="buttonTypeOptions"
            placeholder="장치를 선택해주세요"
            :clearable="false"
            :searchable="false"
            class="mb-1"
          />
          <div
            v-if="selectedButtonType!=[]"
            class="m-2"
          >
            <b-card
              border-variant="primary"
              bg-variant="transparent"
              clsss="d-flex p-3"
            >
              <b-form-checkbox-group
                v-model="selectedButtons"
                :options="buttonCheckbox"
                class="d-flex text-center"
              />
            </b-card>
          </div>
        </div>

        <!-- button control -->
        <div
          v-if="selectedButtonType!=[]"
          class="text-center"
        >

          <!-- open / stop / close -->
          <b-form-group
            v-if="selectedButtonType.value!=='inverter' && selectedButtonType.value !=='feeder'"
          >
            <b-form-radio-group
              v-model="selectedCommand"
              button-variant="outline-primary"
              :options="buttonOptions"
              buttons
              class="p-1 d-flex"
            />
          </b-form-group>

          <!-- slider, work / stop -->
          <b-form-group
            v-if="selectedButtonType.value=='inverter' || selectedButtonType.value=='feeder'"
          >
            <vue-slider
              v-if="selectedButtonType.value=='inverter'"
              v-model="sliderValue"
              class="p-1 m-2 text-primary"
              tooltip="always"
              :tooltip-formatter="`${sliderValue} Hz`"
            />
            <b-form-radio-group
              v-model="selectedCommand"
              button-variant="outline-primary"
              :options="inverterOptions"
              buttons
              class="p-1 d-flex mt-2"
            />
          </b-form-group>
        </div>
      </b-col>

      <b-col cols="12">
        <div class="divider my-2">
          <div class="divider-text text-primary">
            Mode Setting
          </div>
        </div>
        <b-form-group
          class="text-center pt-1 pb-1"
        >
          <v-select
            v-model="selectedMode"
            :options="modeOptions"
            placeholder="자동화 모드를 선택해주세요"
            :clearable="false"
            :searchable="false"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- time setting -->
    <b-row v-if="selectedMode.value==='time'">
      <b-col cols="6">
        <b-form-group
          label="시작 시간"
          class="text-center"
        >
          <b-form-timepicker
            v-model="startTime"
            minutes-step="30"
            label-ampm="오전/오후"
            label-am="오전"
            label-pm="오후"
            label-no-time-selected="시간 선택"
            no-close-button
            required
          />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          label="마침 시간"
          class="text-center"
        >
          <b-form-timepicker
            v-model="endTime"
            minutes-step="30"
            label-ampm="오전/오후"
            label-am="오전"
            label-pm="오후"
            label-no-time-selected="시간 선택"
            no-close-button
            required
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- periodic setting -->
    <b-row v-if="selectedMode.value==='periodic'">
      <b-col md="6">
        <b-form-group
          label="동작 시간"
          label-for="working-time"
          class="text-center"
        >
          <b-form-spinbutton
            id="working-time"
            v-model="inputTime"
            min="1"
            step="1"
            cols="6"
          />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group
          label="단위"
          label-for="working-time-unit"
          class="text-center"
        >
          <v-select
            id="working-time-unit"
            v-model="selectedTime"
            :options="timeOptions"
            :clearable="false"
            :searchable="false"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- sensor setting -->
    <b-row v-if="selectedMode.value==='sensor'">
      <b-col cols="12">
        <b-form-group class="text-center">
          <v-select
            v-model="selectedSensor"
            :options="sensorOptions"
            placeholder="선택해주세요"
          />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          label="최소값 (°C)"
          class="text-center"
        >
          <b-form-input
            v-model="minValue"
            type="number"
          />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          label="최대값 (°C)"
          class="text-center"
        >
          <b-form-input
            v-model="maxValue"
            type="number"
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- submit and reset -->
    <b-row v-if="selectedButtons.length !== 0">
      <b-col>
        <b-button
          type="submit"
          variant="primary"
          class="float-right mt-1"
          block
          @click="submit"
        >
          설정
        </b-button>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import store from '@/store'
import {
  BRow, BCol, BFormGroup, BButton, BFormCheckboxGroup, BCard, BCardTitle, BFormTimepicker, BFormSpinbutton, BFormInput, BFormRadioGroup,
} from 'bootstrap-vue'
import VueSlider from 'vue-slider-component'
import vSelect from 'vue-select'
import 'vue2-timepicker/dist/VueTimepicker.css'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardTitle,
    BFormGroup,
    BButton,
    BFormCheckboxGroup,
    vSelect,
    BFormTimepicker,
    BFormSpinbutton,
    BFormInput,
    BFormRadioGroup,
    VueSlider,
  },
  data() {
    return {
      selectedDay: [0, 1, 2, 3, 4, 5, 6],
      dayOptions: [
        { text: '월', value: 0 },
        { text: '화', value: 1 },
        { text: '수', value: 2 },
        { text: '목', value: 3 },
        { text: '금', value: 4 },
        { text: '토', value: 5 },
        { text: '일', value: 6 },
      ],
      modeOptions: [
        { label: '시간 설정', value: 'time' },
        { label: '주기 설정', value: 'periodic' },
        { label: '센서 설정', value: 'sensor' },
      ],
      selectedMode: '',

      // time
      startTime: '00:00',
      endTime: '00:00',
      inputTime: 1,
      selectedTime: { label: '분', value: 'min' },
      timeOptions: [
        { label: '분', value: 'min' },
        { label: '시간', value: 'hour' },
        { label: '일', value: 'day' },
      ],

      // periodic
      selectedSensor: '',
      sensorOptions: [],

      // sensor
      minValue: 0,
      maxValue: 0,

      selectedCommand: 'stop',
      buttonOptions: [
        { text: '열기', value: 'open' },
        { text: '중지', value: 'stop' },
        { text: '닫기', value: 'close' },
      ],
      inverterOptions: [
        { text: '동작', value: 'work' },
        { text: '중지', value: 'stop' },
      ],
      sliderValue: 0,

      selectedButtonType: '',
      buttonTypeOptions: [],
      buttonCheckbox: [],
      selectedButtons: [],
    }
  },
  watch: {
    async selectedButtonType() {
      this.buttonCheckbox = await store.getters['button/getButtonInTypeOptions'](this.selectedButtonType.value)
      this.selectedButtons = []

      if (this.selectedButtonType.value === 'feeder') {
        const hydraulicItems = await store.getters['button/getButtonInTypeOptions']('hydraulic')
        this.buttonCheckbox = this.buttonCheckbox.concat(hydraulicItems)
      }
    },
  },
  created() {
    this.getSensorOptions()
    this.getButtonCheckbox()
    this.initData()
  },
  methods: {
    initData() {
      this.selectedDay = [0, 1, 2, 3, 4, 5, 6]
      this.selectedMode = ''

      // time
      this.startTime = '00:00'
      this.endTime = '00:00'
      this.inputTime = 1
      this.selectedTime = { label: '분', value: 'min' }

      // periodic
      this.selectedSensor = ''

      // sensor
      this.minValue = 0
      this.maxValue = 0

      this.selectedCommand = 'stop'
      this.sliderValue = 0

      this.selectedButtonType = ''
      this.buttonCheckbox = []
      this.selectedButtons = []
    },
    async getSensorOptions() {
      if (store.state.sensor.sensors.length <= 0) {
        await store.dispatch('sensor/fetchSensors',
          { userId: getUserData().id })
      }
      this.sensorOptions = await store.getters['sensor/getSensorSelect']
    },
    async getButtonCheckbox() {
      if (store.state.button.buttons.length <= 0) {
        await store.dispatch('button/fetchButtons', { userId: getUserData().id })
      }

      this.buttonTypeOptions = await store.getters['button/getButtonTypes']('')
    },
    submit() {
      let settingParam = {}

      if (this.selectedMode.value === 'time') settingParam = this.submitTime()
      else if (this.selectedMode.value === 'periodic') settingParam = this.submitPeriodic()
      else if (this.selectedMode.value === 'sensor') settingParam = this.submitSensor()

      const param = {
        ids: this.selectedButtons,
        setting: settingParam,
      }

      store.dispatch('button/addSettingMany', { queryBody: param }).then(() => {
        this.$emit('submit')
        this.$bvModal.msgBoxOk('새로운 자동화 설정이 추가되었습니다', {
          title: '자동화 설정 추가',
          centered: true,
        }).then(() => {
          this.initData()
        })
      })
    },
    submitTime() {
      const param = {
        mode: this.selectedMode.value,
        days: this.selectedDay,
        command: this.selectedCommand,
        commandValue: this.sliderValue,
        startTime: this.startTime,
        endTime: this.endTime,
      }
      return param
    },
    submitPeriodic() {
      if (this.selectedTime.value === 'hour') {
        this.inputTime *= 60
      } else if (this.selectedTime.value === 'day') {
        this.inputTime *= 60 * 24
      }
      const param = {
        mode: this.selectedMode.value,
        days: this.selectedDay,
        command: this.selectedCommand,
        commandValue: this.sliderValue,
        periodic: this.inputTime,
      }
      return param
    },
    submitSensor() {
      const param = {
        mode: this.selectedMode.value,
        days: this.selectedDay.sort((a, b) => a - b),
        command: this.selectedCommand,
        commandValue: this.sliderValue,
        sensorId: this.selectedSensor.value,
        minValue: this.minValue,
        maxValue: this.maxValue,
      }
      return param
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-slider.scss';
</style>
