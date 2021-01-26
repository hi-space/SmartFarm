u<template>
  <div>
    <!-- Button -->
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      class="btn-icon"
      pill
      @click="showModal"
    >
      <span class="align-middle"> 버튼 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      v-model="addButtonModal"
      title="버튼 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      no-close-on-backdrop
      centered
      @ok="createButton()"
    >
      <b-form>
        <b-form-group
          label="농장 이름"
          label-for="farmName"
        >
          <v-select
            id="farmName"
            v-model="farmName"
            :options="farmOptions"
            :searchable="searchable"
            :clearable="clearable"
          />
        </b-form-group>
        <b-form-group
          label="버튼 타입"
          label-for="button-type"
        >
          <v-select
            id="button-type"
            v-model="type"
            :options="buttonOptions"
            :searchable="searchable"
            :clearable="clearable"
          />
        </b-form-group>
        <b-form-group
          label="버튼 이름"
          label-for="button-name"
        >
          <b-form-input
            id="button-name"
            v-model="name"
            type="text"
            placeholder="이름"
          />
        </b-form-group>
        <b-form-group
          label="신호 타입"
          label-for="signal-type"
        >
          <v-select
            id="signal-type"
            v-model="signalTypeSelected"
            :options="signalTypeOptions"
            :searchable="searchable"
            :clearable="clearable"
          />
        </b-form-group>
        <b-form-group
          label="Relay 사용 개수"
          label-for="relay-num"
        >
          <b-form-spinbutton
            id="relay-num"
            v-model="relayNum"
            min="1"
            max="5"
          />
        </b-form-group>
        <!-- <b-row>
          <b-col md="6">
            <b-form-group
              label="동작 시간"
              label-for="working-time"
            >
              <b-form-spinbutton
                id="working-time"
                v-model="workingTime"
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
            >
              <v-select
                id="working-time-unit"
                v-model="timeUnitSelected"
                :options="timeUnitOptions"
                :searchable="searchable"
                :clearable="clearable"
              />
            </b-form-group>
          </b-col>
        </b-row> -->
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BButton, BModal, VBModal, BForm, BFormGroup, BFormSpinbutton, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    // BRow,
    // BCol,
    BModal,
    BForm,
    BFormGroup,
    BFormSpinbutton,
    BFormInput,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      addButtonModal: false,
      type: { label: '커튼', value: 'curtain' },
      name: '',
      buttonOptions: [
        { label: '커튼', value: 'curtain' },
        { label: '천장', value: 'ceiling' },
        { label: '사료급이기', value: 'feeder' },
        { label: '조명', value: 'light' },
        { label: '선풍기', value: 'fan' },
        { label: '안개분무기', value: 'sprayer' },
        { label: '인버터', value: 'inverter' },
      ],
      signalTypeSelected: 'Toggle',
      signalTypeOptions: ['Toggle'],
      farmOptions: [],
      farmName: '',
      // timeUnitSelected: '초',
      // timeUnitOptions: ['초', '분', '시간', '일', '주', '달'],
      workingTime: 0,
      relayNum: 1,
      searchable: false,
      clearable: false,
    }
  },
  methods: {
    showModal() {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.addButtonModal = true
    },

    createButton() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.name,
        type: this.type.value,
        'buttonSetting.relayCount': this.relayNum,
        'buttonSetting.signalType': this.signalTypeSelected,
      }

      this.$store.dispatch('button/createButton', { queryBody: payload })
        .then(() => {
          this.$router.go()
        }).catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
