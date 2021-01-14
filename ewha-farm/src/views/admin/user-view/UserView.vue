<template>
  <div>

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'user-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <!-- User Info & Edit -->
    <template v-if="userData">
      <b-row>
        <b-col>
          <user-view-info
            class="mt-2 pt-75"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <user-farm-table
            class="mt-2 pt-75"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <user-housing-table
            class="mt-2 pt-75"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <user-device-table
            class="mt-2 pt-75"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <user-cctv-table
            class="mt-2 pt-75"
          />
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <user-button-table
            class="mt-2 pt-75"
          />
        </b-col>
      </b-row>
    </template>

  </div>
</template>

<script>
import store from '@/store'
import router from '@/router'
import { ref } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'

import UserViewInfo from './UserViewInfo.vue'
import UserFarmTable from './farm/UserFarmTable.vue'
import UserHousingTable from './housing/UserHousingTable.vue'
import UserCCTVTable from './cctv/UserCCTVTable.vue'
import UserDeviceTable from './device/UserDeviceTable.vue'
import UserButtonTable from './button/UserButtonTable.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    UserViewInfo,
    UserFarmTable,
    UserHousingTable,
    'user-cctv-table': UserCCTVTable,
    UserDeviceTable,
    UserButtonTable,
  },
  setup() {
    const userData = ref(null)

    store.dispatch('users/fetchUser', { id: router.currentRoute.params.id })
      .then(response => { userData.value = response.data })
      .catch(error => {
        console.log(error)
      })

    return {
      userData,
    }
  },
}
</script>

<style>

</style>
