<template>
  <!-- Modal -->
  <b-modal
    ref="addSensorModal"
    title="센서 등록"
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
          :clearable="false"
          :searchable="false"
        />
      </b-form-group>
      <b-form-group
        label="센서 타입"
        label-for="type"
      >
        <v-select
          id="type"
          v-model="type"
          :options="typeOptions"
          :clearable="false"
          :searchable="false"
        />
      </b-form-group>
      <b-form-group
        label="센서 이름"
        label-for="sensorName"
      >
        <b-form-input
          id="sensorName"
          v-model="sensorName"
          type="text"
          placeholder="이름"
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
  BModal, VBModal, BForm, BFormInput, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { sensorList, getSensorLabel } from './utils'

export default {
  components: {
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      farmOptions: [],
      farmName: '',
      type: '',
      typeOptions: sensorList,
      sensorName: '',
      url: '',
      slaveId: '',
      address: '',
      id: null,
    }
  },
  methods: {
    showModal() {
      this.id = null
      this.farmName = ''
      this.type = ''
      this.sensorName = ''
      this.url = ''
      this.slaveId = ''
      this.address = ''
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.$refs.addSensorModal.show()
    },
    editModal(item) {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.farmName = this.farmOptions.find(el => item.farmId._id === el.value)
      this.id = item._id
      this.type = getSensorLabel(item.type)
      this.sensorName = item.name
      this.url = item.url
      this.slaveId = item.slaveId
      this.address = item.address

      this.$refs.addSensorModal.show()
    },
    create() {
      console.log(this.type.value)
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        type: this.type.value,
        name: this.sensorName,
        url: this.url,
        slaveId: this.slaveId,
        address: this.address,
      }

      this.$store.dispatch('sensor/createSensor', { queryBody: payload })
        .then(() => {
          this.$bvModal.msgBoxOk('새로운 센서가 추가되었습니다', {
            title: '센서 추가',
            centered: true,
          }).then(() => {
            this.$emit('update')
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    modify() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        type: this.type.value,
        name: this.sensorName,
        url: this.url,
        slaveId: this.slaveId,
        address: this.address,
      }

      this.$store.dispatch('sensor/updateSensor', { id: this.id, queryBody: payload })
        .then(() => {
          this.$bvModal.msgBoxOk('센서가 수정되었습니다', {
            title: '센서 수정',
            centered: true,
          }).then(() => {
            this.$router.go(0)
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
