<template>
  <!-- Modal -->
  <b-modal
    ref="addCameraModal"
    title="CCTV 등록"
    ok-title="등록"
    cancel-title="취소"
    cancel-variant="outline-secondary"
    no-close-on-backdrop
    scrollable
    centered
    @ok="id ? modify() : create()"
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
          :clearable="false"
          :searchable="false"
        />
      </b-form-group>
      <b-form-group
        label="CCTV 이름"
        label-for="cctv-name"
      >
        <b-form-input
          id="cctv-name"
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
        label="RTSP URL"
        label-for="rtspUrl"
      >
        <b-form-input
          id="rtspUrl"
          v-model="rtspUrl"
          type="text"
          placeholder=""
        />
      </b-form-group>
      <b-form-group
        label="Streming Server URL"
        label-for="streamingUrl"
      >
        <b-form-input
          id="streamingUrl"
          v-model="streamingUrl"
          type="text"
          placeholder=""
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
          type="text"
          placeholder="············"
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
      farmOptions: [],
      farmName: '',
      name: '',
      info: '',
      rtspUrl: '',
      streamingUrl: '',
      account: '',
      password: '',
      id: null,
    }
  },
  methods: {
    showModal() {
      this.id = null
      this.farmName = ''
      this.name = ''
      this.info = ''
      this.rtspUrl = ''
      this.streamingUrl = ''
      this.account = ''
      this.password = ''
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.$refs.addCameraModal.show()
    },
    editModal(item) {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.id = item._id
      this.farmName = this.farmOptions.filter(el => item.farmId._id === el.value)
      this.name = item.name
      this.info = item.info
      this.rtspUrl = item.rtspUrl
      this.streamingUrl = item.streamingUrl
      this.account = item.account
      this.password = item.password
      this.$refs.addCameraModal.show()
    },

    create() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.name,
        info: this.info,
        rtspUrl: this.rtspUrl,
        streamingUrl: this.streamingUrl,
        account: this.account,
        password: this.password,
      }

      this.$store.dispatch('cctv/createCCTV', { queryBody: payload })
        .then(() => {
          this.$emit('update')
        }).catch(err => {
          console.log(err)
        })
    },
    modify() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.name,
        info: this.info,
        rtspUrl: this.rtspUrl,
        streamingUrl: this.streamingUrl,
        account: this.account,
        password: this.password,
      }

      this.$store.dispatch('cctv/updateCCTV', { id: this.id, queryBody: payload })
        .then(() => {
          this.$router.go(0)
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
