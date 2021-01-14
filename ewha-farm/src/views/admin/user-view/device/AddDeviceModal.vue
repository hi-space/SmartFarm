<template>
  <div>
    <!-- Button -->
    <b-button
      v-b-modal.add-device-modal
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      class="btn-icon"
      pill
    >
      <span class="align-middle"> 통신 장비 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-device-modal"
      title="통신 장비 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      scrollable
      centered
      @ok="createDevice()"
    >
      <b-form>
        <b-form-group
          label="농장 이름"
          label-for="farmName"
        >
          <v-select
            id="farmName"
            v-model="farmName"
          />
        </b-form-group>
        <b-form-group
          label="함체 이름"
          label-for="housingName"
        >
          <v-select
            id="housingName"
            v-model="housingName"
          />
        </b-form-group>
        <b-form-group
          label="통신 장비 이름"
          label-for="deviceName"
        >
          <b-form-input
            id="deviceName"
            type="text"
          />
        </b-form-group>

        <div class="divider my-2">
          <div class="divider-text text-primary">
            Network Setting
          </div>
        </div>

        <b-form-group
          label="타입"
          label-for="type"
        >
          <v-select
            id="type"
            v-model="type_selected"
            :options="type_option"
          />
        </b-form-group>
        <b-form-group
          label="Port"
          label-for="port"
        >
          <b-form-input
            id="port"
            type="number"
            placeholder="10000"
          />
        </b-form-group>
        <b-form-group
          label="ID"
          label-for="account"
        >
          <b-form-input
            id="account"
            type="text"
            placeholder="admin"
          />
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="password"
        >
          <b-form-input
            id="password"
            type="password"
            placeholder="············"
          />
        </b-form-group>
        <b-form-group
          label="Serial Number"
          label-for="serialNum"
        >
          <b-form-input
            id="serialNum"
            type="text"
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
import store from '@/store'
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
      type_selected: 'K868',
      type_option: ['ET0808', 'K868'],
      farmName: '',
      housingName: '',
    }
  },
  methods: {
    createDevice() {
      const postBody = {
        userId: store.state.users.user._id,
        name: this.name,
        info: this.info,
      }

      store.dispatch('device/createDevice', { queryBody: postBody })
        .then(response => {
          console.log(response)
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
