<template>
  <!-- Modal -->
  <b-modal
    ref="addDeviceModal"
    title="통신 장비 등록"
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
        label="통신 장비 이름"
        label-for="deviceName"
      >
        <b-form-input
          id="deviceName"
          v-model="deviceName"
          type="text"
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
          v-model="deviceType"
          :options="type_option"
          :clearable="false"
          :searchable="false"
        />
      </b-form-group>
      <b-form-group
        label="채널"
        label-for="channel"
      >
        <v-select
          id="channel"
          v-model="channel"
          :options="channel_option"
          :clearable="false"
          :searchable="false"
        />
      </b-form-group>
      <b-form-group
        label="DDNS"
        label-for="ddns"
      >
        <b-form-input
          id="ddns"
          v-model="ddns"
          type="text"
          placeholder=""
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
      <b-form-group
        label="Serial Number"
        label-for="serialNum"
      >
        <b-form-input
          id="serialNum"
          v-model="serialNum"
          type="text"
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
      type_option: ['KC868'],
      channel_option: [8, 16],
      farmName: '',
      deviceName: '',
      deviceType: '',
      channel: '',
      ddns: '',
      port: '',
      account: '',
      password: '',
      serialNum: '',
      id: null,
    }
  },
  methods: {
    showModal() {
      this.id = null
      this.farmName = ''
      this.deviceName = ''
      this.deviceType = ''
      this.channel = ''
      this.ddns = ''
      this.port = ''
      this.account = ''
      this.password = ''
      this.serialNum = ''
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.$refs.addDeviceModal.show()
    },
    editModal(item) {
      this.farmOptions = this.$store.getters['farm/getFarmSelect']
      this.id = item._id
      this.farmName = this.farmOptions.find(el => item.farmId._id === el.value)
      this.deviceName = item.name
      this.deviceType = item.type
      this.channel = item.channel
      this.ddns = item.ddns
      this.port = item.port
      this.account = item.account
      this.password = item.password
      this.serialNum = item.serialNum

      this.$refs.addDeviceModal.show()
    },

    create() {
      const postBody = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.deviceName,
        type: this.deviceType,
        channel: this.channel,
        ddns: this.ddns,
        port: this.port,
        account: this.account,
        password: this.password,
        serialNum: this.serialNum,
      }

      this.$store.dispatch('device/createDevice', { queryBody: postBody })
        .then(() => {
          this.$emit('update')
        })
        .catch(error => {
          console.log(error)
        })
    },
    modify() {
      const postBody = {
        userId: this.$store.getters['users/getUserId'],
        farmId: this.farmName.value,
        name: this.deviceName,
        type: this.deviceType,
        channel: this.channel,
        ddns: this.ddns,
        port: this.port,
        account: this.account,
        password: this.password,
        serialNum: this.serialNum,
      }

      this.$store.dispatch('device/updateDevice', { id: this.id, queryBody: postBody })
        .then(() => {
          this.$emit('update')
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
