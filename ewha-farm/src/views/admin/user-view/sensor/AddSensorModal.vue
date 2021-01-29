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
        label="센서 타입"
        label-for="type"
      >
        <v-select
          id="type"
          v-model="type"
          :options="typeOptions"
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
      type: '',
      typeOptions: sensorList,
      sensorName: '',
      id: null,
    }
  },
  methods: {
    showModal() {
      this.id = null
      this.type = ''
      this.sensorName = ''
      this.$refs.addSensorModal.show()
    },
    editModal(item) {
      this.id = item._id
      this.type = getSensorLabel(item.type)
      this.sensorName = item.name

      this.$refs.addSensorModal.show()
    },
    create() {
      console.log(this.type.value)
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        type: this.type.value,
        name: this.sensorName,
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
        type: this.type.value,
        name: this.sensorName,
      }

      this.$store.dispatch('sensor/updateSensor', { id: this.id, queryBody: payload })
        .then(() => {
          this.$bvModal.msgBoxOk('센서가 수정되었습니다', {
            title: '센서 수정',
            centered: true,
          }).then(() => {
            this.$emit('update')
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
