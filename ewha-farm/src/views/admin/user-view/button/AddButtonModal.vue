<template>
  <!-- Modal -->
  <b-modal
    ref="addButtonModal"
    title="버튼 등록"
    ok-title="등록"
    cancel-title="취소"
    cancel-variant="outline-secondary"
    no-close-on-backdrop
    centered
    @ok="id ? modify() : create()"
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
          :searchable="false"
          :clearable="false"
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
          :searchable="false"
          :clearable="false"
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
          :searchable="false"
          :clearable="false"
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
    </b-form>
  </b-modal>
</template>

<script>
import {
  BModal, VBModal, BForm, BFormGroup, BFormSpinbutton, BFormInput,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { buttonList, signalList, getButtonLabel, getSignalLabel } from './utils'

export default {
  components: {
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
  },
  data() {
    return {
      type: '',
      name: '',
      buttonOptions: buttonList,
      signalTypeSelected: '',
      signalTypeOptions: signalList,
      farmOptions: [],
      farmName: '',
      workingTime: 0,
      relayNum: 1,
      id: null,
    }
  },
  methods: {
    showModal() {
      this.id = null
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.type = ''
      this.name = ''
      this.signalTypeSelected = ''
      this.farmName = ''
      this.relayNum = 1
      this.$refs.addButtonModal.show()
    },
    editModal(item) {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.signalTypeOptions = signalList
      this.id = item._id
      this.farmName = this.farmOptions.filter(el => item.farmId._id === el.value)
      this.name = item.name
      this.type = getButtonLabel(item.type)
      this.relayNum = item.buttonSetting.relayCount
      this.signalTypeSelected = getSignalLabel(item.buttonSetting.signalType)
      this.$refs.addButtonModal.show()
    },

    create() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.name,
        type: this.type.value,
        'buttonSetting.relayCount': this.relayNum,
        'buttonSetting.signalType': this.signalTypeSelected.value,
      }

      this.$store.dispatch('button/createButton', { queryBody: payload })
        .then(() => {
          this.$emit('update')
        }).catch(err => {
          console.log(err)
        })
    },

    modify() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.name,
        type: this.type.value,
        'buttonSetting.relayCount': this.relayNum,
        'buttonSetting.signalType': this.signalTypeSelected.value,
      }

      this.$store.dispatch('button/updateButton', { id: this.id, queryBody: payload })
        .then(() => {
          this.$emit('update')
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
