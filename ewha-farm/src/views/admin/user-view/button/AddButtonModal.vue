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
      <b-form-group
        label="DDNS"
        label-for="ddns"
      >
        <b-form-input
          id="ddns"
          v-model="ddns"
          type="text"
          placeholder=""
        />
      </b-form-group>
      <b-form-group
        label="Port"
        label-for="port"
      >
        <b-form-input
          id="port"
          v-model="port"
          type="number"
          placeholder=""
        />
      </b-form-group>
      <b-form-group
        label="URL"
        label-for="url"
      >
        <b-form-input
          id="URL"
          v-model="url"
          type="text"
          placeholder="COM9,9600,8,0,1"
        />
      </b-form-group>
      <b-form-group
        label="Slave ID"
        label-for="slaveId"
      >
        <b-form-input
          id="Slave ID"
          v-model="slaveId"
          type="number"
          placeholder="2"
        />
      </b-form-group>
      <b-form-group
        label="address"
        label-for="address"
      >
        <b-form-input
          id="address"
          v-model="address"
          type="number"
          placeholder="0"
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
import {
  buttonList, signalList, getButtonLabel, getSignalLabel,
} from './utils'

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
      ddns: '',
      port: '',
      url: '',
      slaveId: '',
      address: '',
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
      this.ddns = ''
      this.port = ''
      this.url = ''
      this.slaveId = ''
      this.address = ''
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
      this.ddns = item.ddns
      this.port = item.port
      this.url = item.url
      this.address = item.address
      this.slaveId = item.slaveId
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
        ddns: this.ddns,
        port: this.port,
        url: this.url,
        slaveId: this.slaveId,
        address: this.address,
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
        ddns: this.ddns,
        port: this.port,
        url: this.url,
        slaveId: this.slaveId,
        address: this.address,
        'buttonSetting.relayCount': this.relayNum,
        'buttonSetting.signalType': this.signalTypeSelected.value,
      }

      this.$store.dispatch('button/updateButton', { id: this.id, queryBody: payload })
        .then(() => {
          this.$router.go(0)
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
