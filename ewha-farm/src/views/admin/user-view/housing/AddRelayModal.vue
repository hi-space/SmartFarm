<template>
  <div>
    <!-- Button -->
    <b-button
      v-b-modal.add-relay-modal
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      class="btn-icon"
      pill
    >
      <span class="align-middle"> 버튼 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-relay-modal"
      title="릴레이 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      centered
    >
      <b-form>
        <b-form-group
          label="DDNS"
          label-for="network-ddns"
        >
          <b-form-input
            id="network-ddns"
            type="text"
            placeholder="xxx.iptime.org"
            readonly
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
          label="Relay 타입"
          label-for="relay-type"
        >
          <v-select
            id="relay-type"
            v-model="selected"
            :options="option"
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
      selected: 'ET0808',
      option: ['ET0808', 'KC868'],
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
