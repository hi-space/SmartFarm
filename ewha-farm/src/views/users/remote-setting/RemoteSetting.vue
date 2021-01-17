<template>
  <b-card>
    <b-card-title class="text-center"> <h3> <strong> 자동화 설정 </strong> </h3> </b-card-title>
    <b-row>
      <b-col cols="12">
        <b-form-group
          class="text-center p-1"
        >
          <b-form-checkbox-group
            v-model="selectedDay"
            :options="dayOptions"
            buttons
            button-variant="outline-primary"
          />
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-form-group
          class="text-center pt-2 pb-2"
        >
          <v-select
            v-model="selectedMode"
            :options="modeOptions"
            placeholder="선택해주세요"
          />
        </b-form-group>
      </b-col>
      <b-col cols="6">
        <b-form-group
          label="시작 시간"
          class="text-center"
        >
          <b-form-timepicker
            v-model="startTime"
            seconds-step="30"
            label-ampm="오전/오후"
            label-am="오전"
            label-pm="오후"
            label-no-time-selected="시간을 선택해주세요"
            reset-button
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
            label-no-time-selected="시간을 선택해주세요"
            reset-button
            required
          />
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col cols="12">
        <b-button
          type="submit"
          variant="primary"
          class="float-right mt-1"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>

  </b-card>
</template>

<script>
import {
  BRow, BCol, BFormGroup, BButton, BFormCheckboxGroup, BCard, BCardTitle, BFormTimepicker,
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
  },
  data() {
    return {
      selectedDay: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
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
      startTime: '00:00',
      endTime: '00:00',
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
