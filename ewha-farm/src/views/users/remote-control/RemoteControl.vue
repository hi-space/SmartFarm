<template>
  <div>
    <b-card>
      <b-row>
        <b-col
          sm="12"
          md="6"
          class="p-1"
        >
          <v-select
            v-model="selectedFarm"
            :options="farmOptions"
            placeholder="축사 선택"
            :clearable="false"
          />
        </b-col>
        <b-col
          sm="12"
          md="6"
          class="p-1"
        >
          <v-select
            v-model="selectedButton"
            :options="buttonTypeOptions"
            placeholder="장치 선택"
            :clearable="false"
          />
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="buttonItems.length > 0">
      <!-- selected button control -->
      <div
        class="text-center m-1"
      >
        <!-- open / stop / close -->
        <b-form-group
          v-if="selectedButton.value!=='inverter'"
        >
          <b-form-radio-group
            v-model="selectedCommand"
            button-variant="outline-primary"
            :options="buttonOptions"
            buttons
            class="p-1 d-flex"
          />
        </b-form-group>

        <!-- inverter: slider, work / etop -->
        <b-form-group
          v-if="selectedButton.value=='inverter'"
        >
          <vue-slider
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

      <div class="divider my-2">
        <div class="divider-text text-primary">
          선택한 장치 제어
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <!-- all select checkbox -->
        <b-form-checkbox
          v-model="allSelectCheckbox"
        >
          전체선택
        </b-form-checkbox>
        <b-button-group size="sm">
          <b-button
            v-for="option in automaticOptions"
            :key="option.value"
            variant="outline-primary"
          >
            {{ option.text }}
          </b-button>
        </b-button-group>
      </div>
    </b-card>

    <hr>

    <b-row>
      <b-col
        v-for="item in buttonItems"
        :key="item._id"
        sm="12"
        md="6"
        lg="4"
      >
        <control-card :item="item" />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BButtonGroup, BButton, BFormCheckbox, BFormGroup, BFormRadioGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import VueSlider from 'vue-slider-component'
import store from '@/store'
import ControlCard from './components/ControlCard.vue'

export default {
  components: {
    BButtonGroup,
    BButton,
    BFormCheckbox,
    BCard,
    BCol,
    BRow,
    BFormGroup,
    BFormRadioGroup,
    vSelect,
    VueSlider,
    ControlCard,
  },
  data() {
    return {
      selectedFarm: [],
      selectedButton: [],
      farmOptions: [],
      buttonTypeOptions: [],
      automaticOptions: [
        { text: '자동', value: true },
        { text: '수동', value: false },
      ],

      buttonItems: [],

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

      allSelectCheckbox: false,
    }
  },
  watch: {
    async selectedFarm() {
      if (store.state.button.buttons.length <= 0) {
        await store.dispatch('button/fetchButtons', { userId: store.getters['users/getUserId'] })
      }
      this.buttonTypeOptions = await store.getters['button/getButtonTypes'](this.selectedFarm.value)
      this.selectedButton = []
      this.buttonItems = []
    },
    async selectedButton() {
      this.buttonItems = await store.getters['button/getButtonInType'](this.selectedButton.value)
      console.log(this.buttonItems)
    },
  },
  created() {
    this.getFarmOptions()
  },
  methods: {
    async getFarmOptions() {
      await store.dispatch('farm/fetchFarms', { userId: store.getters['users/getUserId'] })
      this.farmOptions = await store.getters['farm/getFarmSelect']
      if (this.farmOptions.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        this.selectedFarm = this.farmOptions[0]
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-slider.scss';
</style>
