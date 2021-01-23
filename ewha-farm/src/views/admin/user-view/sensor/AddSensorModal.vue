<template>
  <div>
    <!-- Button -->
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      class="btn-icon"
      pill
      @click="showModal"
    >
      <span class="align-middle"> 센서 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      v-model="addHousingModal"
      title="센서 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      no-close-on-backdrop
      centered
      @ok="createSensor()"
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
  </div>
</template>

<script>
import {
  BButton, BModal, VBModal, BForm, BFormInput, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      addHousingModal: false,
      farmOptions: [],
      type: '',
      typeOptions: [
        { label: '온도 센서', value: 'temperature' },
        { label: '습도 센서', value: 'humidity' },
        { label: '우적 센서', value: 'rain' },
        { label: '황화수소', value: 'hs2' },
        { label: '암모니아', value: 'nh3' },
      ],
      farmName: '',
      sensorName: '',
    }
  },
  methods: {
    showModal() {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.addHousingModal = true
    },

    createSensor() {
      console.log(this.type.value)
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        type: this.type.value,
        name: this.sensorName,
      }

      this.$store.dispatch('sensor/createSensor', { queryBody: payload })
        .then(() => {
          this.$bvModal.msgBoxOk('새로운 센서가 추가되었습니다', {
            title: '센서 추가',
            centered: true,
          }).then(() => {
            this.$router.go()
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
