<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 축사 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-farm-modal /> </b-card-sub-title>
    </div>

    <div>
      <b-table
        :items="items"
        :fields="fields"
        hover
        responsive
        class="mb-0"
      >

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
            <b-row class="mb-0">
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Full Name : </strong>{{ row.item.id }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Post : </strong>{{ row.item.name }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Salary : </strong>{{ row.item.info }}
              </b-col>
            </b-row>
          </b-card>
        </template>

        <template #cell(show_details)="row">
          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="row.toggleDetails"
          >
            <!-- {{ row.detailsShowing ? 'Hide' : 'Show' }} -->
            <feather-icon icon="ChevronsDownIcon" />
          </b-button>
        </template>
      </b-table>
    </div>
  </b-card>
</template>

<script>
import { ref, onUnmounted } from '@vue/composition-api'
import {
  BCard, BCardTitle, BCardSubTitle, BTable, BButton, BRow, BCol,
} from 'bootstrap-vue'

import { getUserData } from '@/auth/utils'
import fakeData from '@/data/farms.json'
import store from '@/store'

import AddFarmModal from './AddFarmModal.vue'
import farmStoreModule from './farmStoreModule'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BButton,
    BRow,
    BCol,
    'add-farm-modal': AddFarmModal,
  },
  setup() {
    const FARM_APP_STORE_MODULE_NAME = 'app-farm'

    // Register module
    if (!store.hasModule(FARM_APP_STORE_MODULE_NAME)) store.registerModule(FARM_APP_STORE_MODULE_NAME, farmStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(FARM_APP_STORE_MODULE_NAME)) store.unregisterModule(FARM_APP_STORE_MODULE_NAME)
    })

    const farmData = ref(null)
    store.dispatch('app-farm/fetchFarms', { userId: getUserData().id })
      .then(response => {
        farmData.value = response.data
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    return {
      farmData,
    }
  },
  data() {
    return {
      fields: [
        { key: 'id', label: '축사 ID', sortable: true },
        {
          key: 'name',
          label: '축사 이름',
          sortable: true,
          isRowHeader: true,
        },
        // { key: 'cctv', label: 'CCTV 갯수', sortable: true },
        // { key: 'device', label: '함체 갯수', sortable: true },
        { key: 'info', label: '정보', sortable: true },
        { key: 'created', label: '생성일', sortable: true },
        // { key: 'show_details', label: 'details' },
      ],
      items: fakeData,
    }
  },
}
</script>
