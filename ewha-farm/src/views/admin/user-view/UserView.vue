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
            :user-data="userData"
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
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BRow, BCol, BAlert, BLink,
} from 'bootstrap-vue'

import fakeData from '@/data/user.json'

import userStoreModule from '../userStoreModule'
import UserViewInfo from './UserViewInfo.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    UserViewInfo,
  },
  setup() {
    const userData = ref(null)

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    store.dispatch('app-user/fetchUser', { id: router.currentRoute.params.id })
      .then(response => { userData.value = response.data })
      .catch(error => {
        if (error.response.status === 404) {
          // userData.value = undefined
          userData.value = fakeData
        }
      })

    return {
      userData,
    }
  },
}
</script>

<style>

</style>
