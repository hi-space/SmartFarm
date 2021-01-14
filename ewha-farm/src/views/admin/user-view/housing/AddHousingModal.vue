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
      <span class="align-middle"> 함체 추가</span>
      <feather-icon icon="PlusIcon" />
    </b-button>

    <!-- Modal -->
    <b-modal
      v-model="addHousingModal"
      title="함체 등록"
      ok-title="등록"
      cancel-title="취소"
      cancel-variant="outline-secondary"
      scrollable
      centered
      @ok="createHousing()"
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
          label="함체 이름"
          label-for="housingName"
        >
          <b-form-input
            id="housingName"
            v-model="housingName"
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
          label="DDNS"
          label-for="ddns"
        >
          <b-form-input
            id="ddns"
            v-model="ddns"
            type="text"
            placeholder="xxx.iptime.org"
          />
        </b-form-group>
        <b-form-group
          label="Port"
          label-for="port"
        >
          <b-form-input
            id="port"
            v-model="port"
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
      addHousingModal: false,
      farmOptions: [],
      farmName: '',
      housingName: '',
      info: '',
      ddns: '',
      port: '',
      account: '',
      password: '',
    }
  },
  methods: {
    showModal() {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.addHousingModal = true
    },

    createHousing() {
      const payload = {
        userId: this.$store.state.users.user._id,
        farmId: this.farmName.value,
        name: this.housingName,
        info: this.info,
        ddns: this.ddns,
        port: this.port,
        account: this.account,
        password: this.password,
      }

      this.$store.dispatch('housing/createHousing', { queryBody: payload })
        .then(() => {
          this.$bvModal.msgBoxOk('새로운 함체 추가되었습니다', {
            title: '함체 추가',
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
