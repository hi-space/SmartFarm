<template>
  <b-card>
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
      <b-col cols="12">
        <b-form-group
          class="text-center pt-1 pb-1"
        >
          <v-select
            v-model="selectedMode"
            :options="modeOptions"
            placeholder="선택해주세요"
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
            minutes-step="30"
            label-ampm="오전/오후"
            label-am="오전"
            label-pm="오후"
            label-no-time-selected="시간 선택"
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
            seconds-step="30"
            label-ampm="오전/오후"
            label-am="오전"
            label-pm="오후"
            label-no-time-selected="시간 선택"
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
            min="5"
            step="5"
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
          />
        </b-form-group>
      </b-col>
    </b-row>

    <!-- submit and reset -->
    <b-row v-if="selectedMode">
      <b-col>
        <b-button
          type="submit"
          variant="primary"
          class="float-right mt-1"
          block
          @click="submit"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BButton, BFormCheckboxGroup, BCard, BCardTitle, BFormTimepicker, BFormSpinbutton, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import 'vue2-timepicker/dist/VueTimepicker.css'

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
  },
  data() {
    return {
      selectedDay: [],
      dayOptions: [
        { text: '월', value: 'mon' },
        { text: '화', value: 'tue' },
        { text: '수', value: 'wed' },
        { text: '목', value: 'thu' },
        { text: '금', value: 'fri' },
        { text: '토', value: 'sat' },
        { text: '일', value: 'sun' },
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
      inputTime: 5,
      selectedTime: { label: '분', value: 'min' },
      timeOptions: [
        { label: '분', value: 'min' },
        { label: '시간', value: 'hour' },
        { label: '일', value: 'day' },
      ],

      // periodic
      selectedSensor: '',
      sensorOptions: [
        { label: '우적 센서', value: 'rain' },
        { label: '온도 센서', value: 'temp' },
        { label: '습도 센서', value: 'humi' },
      ],

      // sensor
      minValue: 0,
      maxValue: 0,
    }
  },
  methods: {
    submit() {
      if (this.selectedMode.value === 'time') this.submitTime()
      else if (this.selectedMode.value === 'periodic') this.submitPeriodic()
      else if (this.selectedMode.value === 'sensor') this.submitSensor()
    },
    submitTime() {
      console.log('submitTime')
    },
    submitPeriodic() {
      console.log('submitPeriodic')
    },
    submitSensor() {
      console.log('submitSensor')
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
