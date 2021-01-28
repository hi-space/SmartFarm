<template>
  <b-modal
    ref="addHousingModal"
    title="함체 등록"
    ok-title="등록"
    cancel-title="취소"
    cancel-variant="outline-secondary"
    no-close-on-backdrop
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
          placeholder="농장 선택"
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
import Ripple from 'vue-ripple-directive'

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
    Ripple,
  },
  data() {
    return {
      farmOptions: [],
      farmName: '',
      housingName: '',
      info: '',
      ddns: '',
      port: '',
      account: '',
      password: '',
      id: null,
    }
  },
  methods: {
    showModal() {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.$refs.addHousingModal.show()
    },
    editModal(item) {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.id = item._id
      this.farmName = this.farmOptions.filter(el => item.farmId._id === el.value)
      this.housingName = item.name
      this.info = item.info
      this.ddns = item.ddns
      this.port = item.port
      this.account = item.account
      this.password = item.password

      this.$refs.addHousingModal.show()
    },
    create() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
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
            this.$emit('update')
          })
        })
        .catch(error => {
          console.log(error)
        })
    },
    modify() {
      const payload = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.housingName,
        info: this.info,
        ddns: this.ddns,
        port: this.port,
        account: this.account,
        password: this.password,
      }

      this.$store.dispatch('housing/updateHousing', { id: this.id, queryBody: payload })
        .then(() => {
          this.$bvModal.msgBoxOk('함체가 수정되었습니다', {
            title: '함체 수정',
            centered: true,
          }).then(() => {
            this.$emit('update')
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
