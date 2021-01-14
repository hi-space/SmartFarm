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
      <span class="align-middle"> CCTV 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      v-model="addCameraModal"
      title="CCTV 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      scrollable
      centered
      @ok="createCCTV()"
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
          label="CCTV 이름"
          label-for="name"
        >
          <b-form-input
            id="name"
            v-model="name"
            type="text"
            placeholder="이름"
          />
          <b-form-input
            id="info"
            v-model="info"
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
          label-for="rtspUrl"
        >
          <b-form-input
            id="rtspUrl"
            v-model="rtspUrl"
            type="text"
            placeholder="rtsp://.../media/video1"
          />
        </b-form-group>
        <b-form-group
          label="ID"
          label-for="account"
        >
          <b-form-input
            id="account"
            v-model="account"
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
            v-model="password"
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
      addCameraModal: false,
      farmOptions: [],
      farmName: '',
      name: '',
      info: '',
      rtspUrl: '',
      account: '',
      password: '',
    }
  },
  methods: {
    showModal() {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.addCameraModal = true
    },

    createCCTV() {
      const payload = {
        userId: this.$store.state.users.user._id,
        farmId: this.farmName.value,
        name: this.name,
        info: this.info,
        rtspUrl: this.rtspUrl,
        account: this.account,
        password: this.password,
      }

      this.$store.dispatch('cctv/createCCTV', { queryBody: payload })
        .then(() => {
          this.$router.go()
        }).catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
