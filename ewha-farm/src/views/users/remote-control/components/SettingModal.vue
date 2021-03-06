<template>
  <div>
    <!-- Button -->
    <feather-icon
      icon="PlusCircleIcon"
      size="18"
      class="cursor-pointer m-1"
      @click="showModal()"
    />

    <!-- Modal -->
    <b-modal
      ref="settingModal"
      title="자동화 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      no-close-on-backdrop
      centered
      @hidden="reset"
      @ok="submit"
    >
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
        <b-col cols="12">
          <b-form-group
            class="text-center pt-1 pb-1"
          >
            <v-select
              v-model="selectedMode"
              :options="modeOptions"
              placeholder="선택해주세요"
              :clearable="false"
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

      <div
        v-if="selectedMode"
        class="text-center m-1"
      >
        <b-form-group>
          <b-form-radio-group
            v-model="selectedButton"
            button-variant="outline-primary"
            :options="buttonOptions"
            buttons
            class="p-1 d-flex"
          />
        </b-form-group>
      </div>
    </b-modal>
  </div>
</template>

<script>
import store from '@/store'
import {
  BRow, BCol, BFormGroup, BFormCheckboxGroup, BFormTimepicker, BFormSpinbutton, BFormInput, BFormRadioGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormCheckboxGroup,
    vSelect,
    BFormTimepicker,
    BFormSpinbutton,
    BFormInput,
    BFormRadioGroup,
  },
  props: {
    buttonId: {
      type: String,
      required: true,
    },
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

      selectedButton: 'stop',
      buttonOptions: [
        { text: '열기', value: 'open' },
        { text: '중지', value: 'stop' },
        { text: '닫기', value: 'close' },
      ],
    }
  },
  created() {
    this.getSensorOptions()
  },
  methods: {
    async getSensorOptions() {
      if (store.state.sensor.sensors.length < 0) {
        await store.dispatch('sensor/fetchSensors',
          { userId: store.getters['users/getUserId'], farmId: store.getters['farm/getFarmId'] })
      }
      this.sensorOptions = await store.getters['sensor/getSensorSelect']
    },

    showModal() {
      this.$refs.settingModal.show()
    },
    reset() {
      this.selectedDay = [0, 1, 2, 3, 4, 5, 6]
      this.selectedMode = ''
      this.startTime = '00:00'
      this.endTime = '00:00'
      this.inputTime = 1
      this.selectedSensor = ''
      this.minValue = 0
      this.maxValue = 0
      this.selectedButton = 'stop'
      this.getSensorOptions()
    },
    submit() {
      if (this.selectedMode.value === 'time') this.submitTime()
      else if (this.selectedMode.value === 'periodic') this.submitPeriodic()
      else if (this.selectedMode.value === 'sensor') this.submitSensor()
    },
    submitTime() {
      const param = {
        mode: this.selectedMode.value,
        days: this.selectedDay,
        command: this.selectedButton,
        startTime: this.startTime,
        endTime: this.endTime,
      }
      store.dispatch('button/addNewSetting', { id: this.buttonId, queryBody: param }).then(() => {
        this.$emit('submit')
      })
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
        command: this.selectedButton,
        periodic: this.inputTime,
      }
      store.dispatch('button/addNewSetting', { id: this.buttonId, queryBody: param }).then(() => {
        this.$emit('submit')
      })
    },
    submitSensor() {
      const param = {
        mode: this.selectedMode.value,
        days: this.selectedDay.sort((a, b) => a - b),
        command: this.selectedButton,
        sensorId: this.selectedSensor.value,
        minValue: this.minValue,
        maxValue: this.maxValue,
      }
      store.dispatch('button/addNewSetting', { id: this.buttonId, queryBody: param }).then(() => {
        this.$emit('submit')
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
