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
      <b-row class="text-center">
        <b-col
          cols="6"
          class="p-1"
        >
          <b-form-radio-group
            v-if="selectedButton"
            button-variant="outline-primary"
            :options="commandOptions"
            buttons
          />
        </b-col>
        <b-col
          cols="6"
          class="p-1"
        >
          <b-form-radio-group
            v-if="selectedButton"
            button-variant="outline-primary"
            :options="automaticOptions"
            buttons
          />

        </b-col>
      </b-row>
    </b-card>
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
  BRow, BCol, BCard, BFormRadioGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import store from '@/store'
import ControlCard from './components/ControlCard.vue'

export default {
  components: {
    BFormRadioGroup,
    BCard,
    BCol,
    BRow,
    vSelect,
    ControlCard,
  },
  data() {
    return {
      selectedFarm: [],
      selectedButton: [],
      farmOptions: [],
      buttonTypeOptions: [],
      commandOptions: [
        { text: '전체 열기', value: 'open' },
        { text: '전체 닫기', value: 'close' },
      ],
      automaticOptions: [
        { text: '전체 자동', value: true },
        { text: '전체 수동', value: false },
      ],

      buttonItems: [],
    }
  },
  watch: {
    async selectedFarm() {
      this.getButtonOptions()
      this.selectedButton = []
      this.buttonItems = []
    },
    async selectedButton() {
      this.getButtons()
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
    async getButtonOptions() {
      if (store.state.button.buttons.length <= 0) {
        await store.dispatch('button/fetchButtons', { userId: store.getters['users/getUserId'] })
      }
      this.buttonTypeOptions = await store.getters['button/getButtonTypes'](this.selectedFarm.value)
    },
    async getButtons() {
      this.buttonItems = await store.getters['button/getButtonInType'](this.selectedButton.value)
      console.log(this.buttonItems)
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
