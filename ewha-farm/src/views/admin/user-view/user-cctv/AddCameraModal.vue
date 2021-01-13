<template>
  <div>
    <!-- Button -->
    <b-button
      v-b-modal.add-camera-modal
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      class="btn-icon"
      pill
    >
      <span class="align-middle"> CCTV 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-camera-modal"
      title="CCTV 등록"
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
            v-model="selected"
            :options="option"
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
          label="CCTV 이름"
          label-for="camera-name"
        >
          <b-form-input
            id="camera-name"
            type="text"
            placeholder="이름"
          />
          <b-form-input
            id="camera-info"
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
          label="URL"
          label-for="network-url"
        >
          <b-form-input
            id="network-url"
            type="text"
            placeholder="rtsp://.../media/video1"
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
      selected: '제 1축사',
      option: ['제 1축사', '제 2축사', '제 3축사'],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
