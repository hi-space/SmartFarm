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
            :searchable="false"
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
            :searchable="false"
          />
        </b-col>
      </b-row>
    </b-card>

    <b-card v-if="buttonItems.length > 0">

      <div class="d-flex justify-content-between align-items-center">
        <!-- all select checkbox -->
        <b-form-checkbox
          v-model="allChecked"
        >
          전체선택
        </b-form-checkbox>
        <b-form-radio-group
          v-model="selectedAutomaticOption"
          :disabled="checkedItem.length === 0"
          :options="automaticOptions"
          button-variant="outline-primary"
          size="sm"
          buttons
        />
      </div>

      <!-- selected button control -->
      <div
        v-if="checkedItem.length > 0"
        class="text-center m-1"
      >
        <div class="divider my-2">
          <div class="divider-text text-primary">
            선택한 장치 제어
          </div>
        </div>
        <!-- open / stop / close -->
        <b-form-group
          v-if="selectedButton.value!=='inverter'"
        >
          <b-form-radio-group
            v-model="selectedCommand"
            button-variant="outline-primary"
            :options="buttonOptions"
            :disabled="checkedItem.length === 0"
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
            :lazy="true"
            max="60"
            tooltip="always"
            :tooltip-formatter="`${sliderValue} Hz`"
            :disabled="checkedItem.length === 0"
          />
          <b-form-radio-group
            v-model="selectedCommand"
            button-variant="outline-primary"
            :options="inverterOptions"
            :disabled="checkedItem.length === 0"
            buttons
            class="p-1 d-flex mt-2"
          />
        </b-form-group>
      </div>
    </b-card>

    <hr>

    <!-- control card -->
    <b-row>
      <b-col
        v-for="item in buttonItems"
        :key="item._id"
        sm="12"
        md="6"
        lg="4"
      >
        <control-card
          ref="controlCard"
          :key="item._id"
          :item="item"
          :prop-checked="allChecked"
          @changeChecked="changeChecked"
        />
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BFormCheckbox, BFormGroup, BFormRadioGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import VueSlider from 'vue-slider-component'
import store from '@/store'
import { getUserData } from '@/auth/utils'
import ControlCard from './components/ControlCard.vue'

export default {
  components: {
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

      selectedAutomaticOption: '',
      automaticOptions: [
        { text: '자동', value: true },
        { text: '수동', value: false },
      ],

      buttonItems: [],

      selectedCommand: '',
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

      allChecked: false,
      checkedItem: [],
    }
  },
  watch: {
    async selectedFarm() {
      await store.dispatch('button/fetchButtons', { userId: getUserData().id })
      this.buttonTypeOptions = await store.getters['button/getButtonTypes'](this.selectedFarm.value)
      this.selectedButton = []
      this.buttonItems = []
      this.initValue()
    },
    async selectedButton() {
      this.getButtonList()
      this.initValue()
    },
    checkedItem() {
      this.selectedAutomaticOption = ''
      this.selectedCommand = ''
      this.sliderValue = 0
    },
    selectedAutomaticOption() {
      if (this.selectedAutomaticOption === '') return
      const param = {
        ids: this.checkedItem,
        data: {
          isAuto: this.selectedAutomaticOption,
        },
      }
      this.updateData(param)
    },
    selectedCommand() {
      if (this.selectedCommand === '') return
      const param = {
        ids: this.checkedItem,
        data: {
          command: this.selectedCommand,
          commandValue: this.sliderValue,
        },
      }
      this.updateData(param)
    },
  },
  created() {
    this.getFarmOptions()
  },
  methods: {
    initValue() {
      this.checkedItem = []
      this.allChecked = false
      this.selectedAutomaticOption = ''
      this.selectedCommand = ''
      this.sliderValue = 0
    },
    async getFarmOptions() {
      await store.dispatch('farm/fetchFarms', { userId: getUserData().id })
      this.farmOptions = await store.getters['farm/getFarmSelect']
      if (this.farmOptions.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        this.selectedFarm = this.farmOptions[0]
      }
    },
    async getButtonList() {
      this.buttonItems = []
      this.buttonItems = await store.getters['button/getButtonInType'](this.selectedButton.value)
    },
    changeChecked(buttonId, newVal) {
      if (newVal) {
        this.checkedItem.push(buttonId)
      } else {
        this.checkedItem.splice(this.checkedItem.indexOf(buttonId), 1)
      }
    },
    async updateData(param) {
      await store.dispatch('button/updateButtonMany', { queryBody: param })
      await store.dispatch('button/fetchButtons', { userId: getUserData().id })
      await this.getButtonList()
      this.initValue()
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-slider.scss';
</style>
