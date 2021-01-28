<template>
  <!-- Modal -->
  <b-modal
    ref="addFarmModal"
    title="축사 등록"
    ok-title="등록"
    cancel-title="취소"
    cancel-variant="outline-secondary"
    no-close-on-backdrop
    scrollable
    centered
    @ok="id ? modifyFarm() : createFarm()"
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
</template>

<script>
import {
  BModal, VBModal, BForm, BFormInput, BFormGroup,
} from 'bootstrap-vue'

import store from '@/store'

export default {
  components: {
    BModal,
    BForm,
    BFormInput,
    BFormGroup,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      name: '',
      info: '',
      id: null,
    }
  },
  methods: {
    showModal() {
      this.id = null
      this.$refs.addFarmModal.show()
    },
    editModal(item) {
      this.id = item._id
      this.name = item.name
      this.info = item.info

      this.isEdit = true
      this.$refs.addFarmModal.show()
    },
    createFarm() {
      const postBody = {
        userId: store.getters['users/getUserId'],
        name: this.name,
        info: this.info,
      }

      store.dispatch('farm/createFarm', { queryBody: postBody })
        .then(() => {
          this.$bvModal.msgBoxOk('새로운 축사가 추가되었습니다', {
            title: '축사 추가',
            centered: true,
          }).then(() => {
            this.$emit('update')
          })
        }).catch(error => {
          console.log(error)
        })
    },
    modifyFarm() {
      const postBody = {
        userId: store.getters['users/getUserId'],
        name: this.name,
        info: this.info,
      }

      store.dispatch('farm/updateFarm', { id: this.id, queryBody: postBody })
        .then(() => {
          this.$bvModal.msgBoxOk('축사가 수정되었습니다', {
            title: '축사 수정',
            centered: true,
          }).then(() => {
            this.$emit('update')
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
