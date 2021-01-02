<template>
  <div>
    <!-- Button -->
    <b-button
      v-b-modal.add-camera-modal
      variant="outline-primary"
    >
      CCTV 등록
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-camera-modal"
      title="CCTV 등록"
      ok-title="submit"
      cancel-variant="outline-secondary"
      scrollable
      no-close-on-backdrop
    >
      <b-form>
        <b-form-group
          label="농장주"
          label-for="name"
        >
          <b-form-input
            id="name"
            type="text"
          />
        </b-form-group>
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
          />
        </b-form-group>
        <b-form-group
          label="CCTV 이름"
          label-for="camera-name"
        >
          <b-form-input
            id="camera-name"
            type="text"
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
