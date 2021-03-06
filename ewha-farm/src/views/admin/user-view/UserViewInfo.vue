<template>
  <b-card>

    <!-- Media -->
    <div class="d-flex justify-content-start mb-2">
      <b-avatar
        :text="avatarText(userData.userInfo.name)"
        :variant="`light-${resolveUserRoleVariant(userData.userInfo.role)}`"
        size="104px"
        rounded
      />
      <div class="d-flex flex-column ml-1 mt-1">
        <h2 class="mb-1">
          <strong> {{ userData.userInfo.name }} </strong>
        </h2>
        <h3 class="card-text">
          {{ userData.userInfo.phone }}
        </h3>
      </div>
    </div>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row
        class="mb-2"
      >

        <!-- Field: Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="이름"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="userData.userInfo.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Status -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="상태"
            label-for="user-status"
          >
            <v-select
              v-model="userData.userInfo.status"
              :options="statusOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-status"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Role -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="권한"
            label-for="user-role"
          >
            <v-select
              v-model="userData.userInfo.role"
              :options="roleOptions"
              :reduce="val => val.value"
              :clearable="false"
              :disabled="roleDisabled"
              input-id="user-role"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Address -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="농장 주소"
            label-for="address"
          >
            <b-form-input
              id="address"
              v-model="userData.userInfo.address"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Server url -->
        <b-col
          v-if="userData.userInfo.role === 'customer'"
          cols="12"
          md="12"
        >
          <b-form-group
            label="Server URL"
            label-for="url"
          >
            <b-form-input
              id="url"
              v-model="userData.url"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Memo -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="메모"
            label-for="memo"
          >
            <b-form-textarea
              id="memo"
              v-model="userData.userInfo.info"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>

    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1 float-md-right"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="updateUser"
    >
      Save Changes
    </b-button>
    <b-button
      variant="outline-danger"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1 float-md-right"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="checkDelete"
    >
      Delete
    </b-button>
  </b-card>
</template>

<script>
import {
  BButton, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BCard, BFormTextarea,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import store from '@/store'
import router from '@/router'
import { getUserData } from '@/auth/utils'
import userListTable from '../user-list/userListTable'

export default {
  components: {
    BButton,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormTextarea,
    BCard,
    vSelect,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      userData: store.state.users.user,
      roleDisabled: getUserData().role !== 'admin',
    }
  },
  setup() {
    const { resolveUserRoleVariant } = userListTable()

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Manager', value: 'manager' },
      { label: 'Customer', value: 'customer' },
    ]

    const statusOptions = [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    return {
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
    }
  },
  methods: {
    checkDelete() {
      this.$bvModal
        .msgBoxConfirm('이 사용자를 삭제하시겠습니까?', {
          title: '사용자 삭제',
          size: 'sm',
          okVariant: 'danger',
          okTitle: 'Yes',
          cancelTitle: 'No',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: true,
          centered: true,
        })
        .then(value => {
          if (value === true) {
            store.dispatch('users/deleteUser', { id: router.currentRoute.params.id })
              .then(() => {
                router.push({ name: 'user-list' })
              }).catch(error => {
                console.log(error)
              })
          }
        })
    },

    updateUser() {
      store.dispatch('users/updateUser', { id: router.currentRoute.params.id, queryBody: this.userData })
        .then(() => {
          router.push({ name: 'user-list' })
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
