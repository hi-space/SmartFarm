<template>
  <div>
    <!-- Button -->
    <b-button
      v-b-modal.add-farm-modal
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="outline-primary"
      class="btn-icon"
      pill
    >
      <span class="align-middle"> 축사 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-farm-modal"
      title="축사 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      no-close-on-backdrop
      scrollable
      centered
      @ok="createFarm()"
    >
      <b-form>
        <b-form-group
          label="축사 이름"
          label-for="device-name"
        >
          <b-form-input
            id="device-name"
            v-model="name"
            type="text"
            placeholder="이름"
          />
          <b-form-input
            id="device-info"
            v-model="info"
            class="mt-1"
            type="text"
            placeholder="상세 정보"
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
import Ripple from 'vue-ripple-directive'

import store from '@/store'

export default {
  components: {
    BButton,
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      name: '',
      info: '',
    }
  },
  methods: {
    createFarm() {
      const postBody = {
        userId: store.state.users.user._id,
        name: this.name,
        info: this.info,
      }

      store.dispatch('farm/createFarm', { queryBody: postBody })
        .then(() => {
          this.$bvModal.msgBoxOk('새로운 축사가 추가되었습니다', {
            title: '축사 추가',
            centered: true,
          }).then(() => {
            this.$router.go()
          })
        }).catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
