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
      <span class="align-middle"> 함체 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-device-modal"
      title="함체 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      scrollable
      centered
    >
      <b-form>
        <b-form-group
          label="위치"
          label-for="location"
        >
          <v-select
            id="location"
            v-model="loc_selected"
            :options="loc_option"
          />
          <b-form-input
            id="location-detail"
            class="mt-1"
            placeholder="상세 위치"
            type="text"
            readonly
          />
        </b-form-group>
        <b-form-group
          label="함체 이름"
          label-for="device-name"
        >
          <b-form-input
            id="device-name"
            type="text"
            placeholder="이름"
          />
          <b-form-input
            id="device-info"
            class="mt-1"
            type="text"
            placeholder="상세 정보"
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
          label="DDNS"
          label-for="network-ddns"
        >
          <b-form-input
            id="network-ddns"
            type="text"
            placeholder="xxx.iptime.org"
          />
        </b-form-group>
        <b-form-group
          label="Port"
          label-for="network-port"
        >
          <b-form-input
            id="network-port"
            type="number"
            placeholder="10000"
          />
        </b-form-group>
        <b-form-group
          label="ID"
          label-for="network-id"
        >
          <b-form-input
            id="network-id"
            type="text"
            placeholder="admin"
          />
        </b-form-group>
        <b-form-group
          label="Password"
          label-for="network-password"
        >
          <b-form-input
            id="network-password"
            type="password"
            placeholder="············"
          />
        </b-form-group>
        <b-form-group
          label="Serial Number"
          label-for="network-sn"
        >
          <b-form-input
            id="network-sn"
            type="text"
          />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import { onUnmounted } from '@vue/composition-api'
import {
  BButton, BModal, VBModal, BForm, BFormInput, BFormGroup,
} from 'bootstrap-vue'
import store from '@/store'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'
import deviceStoreModule from './deviceStoreModule'

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
  setup() {
    const DEVICE_APP_STORE_MODULE_NAME = 'app-device'

    // Register module
    if (!store.hasModule(DEVICE_APP_STORE_MODULE_NAME)) store.registerModule(DEVICE_APP_STORE_MODULE_NAME, deviceStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(DEVICE_APP_STORE_MODULE_NAME)) store.unregisterModule(DEVICE_APP_STORE_MODULE_NAME)
    })
  },
  data() {
    return {
      loc_selected: '제 1축사',
      loc_option: ['제 1축사', '제 2축사', '제 3축사'],
      type_selected: 'K868',
      type_option: ['ET0808', 'K868'],
    }
  },
  // methods: {
  //   createFarm() {
  //     const postBody = {
  //       userId: getUserData().id,
  //       'farmInfo.name': this.name,
  //       'farmInfo.info': this.info,
  //     }

  //     store.dispatch('app-farm/createFarm', { queryBody: postBody })
  //       .then(response => {
  //         console.log(response)
  //       })
  //       .catch(error => {
  //         console.log(error)
  //       })
  //   },
  // },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
