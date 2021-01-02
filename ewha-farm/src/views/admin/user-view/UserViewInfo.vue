<template>
  <b-card>

    <!-- Media -->
    <div class="d-flex justify-content-start mb-2">
      <b-avatar
        :src="userData.avatar"
        :text="avatarText(userData.fullName)"
        :variant="`light-${resolveUserRoleVariant(userData.role)}`"
        size="104px"
        rounded
      />
      <div class="d-flex flex-column ml-1">
        <h4 class="mb-0">
          {{ userData.fullName }}
        </h4>
        <span class="card-text">{{ userData.email }}</span>
      </div>
    </div>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row
        class="mb-2"
      >
        <!-- Field: Username -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="ID"
            label-for="username"
          >
            <b-form-input
              id="username"
              v-model="userData.username"
              readonly
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="이름"
            label-for="full-name"
          >
            <b-form-input
              id="full-name"
              v-model="userData.fullName"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="userData.email"
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Mobile -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="전화번호"
            label-for="contact"
          >
            <b-form-input
              id="contact"
              v-model="userData.contact"
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
              v-model="userData.status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
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
              v-model="userData.role"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="roleOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-role"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="농장 주소"
            label-for="company"
          >
            <b-form-input
              id="company"
              v-model="userData.company"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
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
              v-model="userData.avatar"
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
    >
      Save Changes
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1 float-md-right"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
    >
      Reset
    </b-button>
    <b-button
      variant="outline-danger"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1 float-md-right"
    >
      Delete
    </b-button>
  </b-card>
</template>

<script>
import {
  BButton, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BCard, BFormTextarea,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import useUsersList from '../user-list/useUsersList'

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
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { resolveUserRoleVariant } = useUsersList()

    const roleOptions = [
      { label: 'Admin', value: 'admin' },
      { label: 'Author', value: 'author' },
      { label: 'Editor', value: 'editor' },
      { label: 'Maintainer', value: 'maintainer' },
      { label: 'Subscriber', value: 'subscriber' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const permissionsData = [
      {
        module: 'Admin',
        read: true,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'Staff',
        read: false,
        write: true,
        create: false,
        delete: false,
      },
      {
        module: 'Author',
        read: true,
        write: false,
        create: true,
        delete: false,
      },
      {
        module: 'Contributor',
        read: false,
        write: false,
        create: false,
        delete: false,
      },
      {
        module: 'User',
        read: false,
        write: false,
        create: false,
        delete: true,
      },
    ]

    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.userData.avatar = base64
    })

    return {
      resolveUserRoleVariant,
      avatarText,
      roleOptions,
      statusOptions,
      permissionsData,

      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
