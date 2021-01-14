<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> CCTV 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-camera-modal /> </b-card-sub-title>
    </div>

    <div>
      <b-table
        :items="cctvData"
        :fields="fields"
        hover
        responsive
        scrollable
        fixed
        class="position-relative mb-0"
      >
        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
        </template>
      </b-table>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle, BTable, BBadge,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import store from '@/store'
import AddCameraModal from './AddCameraModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BBadge,
    'add-camera-modal': AddCameraModal,
  },
  setup() {
    const cctvData = ref(null)
    store.dispatch('cctv/fetchCCTVs', { userId: store.state.users.user._id })
      .then(response => {
        cctvData.value = response.data
      })
      .catch(err => {
        console.log(err)
      })
    return {
      cctvData,
    }
  },

  data() {
    return {
      fields: [
        { key: '_id', label: 'ID', sortable: true },
        { key: 'farmId', label: '축사 ID', sortable: true },
        { key: 'name', label: 'CCTV 이름', sortable: true },
        { key: 'info', label: '정보', sortable: true },
        { key: 'rtspUrl', label: 'rtsp URL', sortable: true },
        { key: 'account', label: 'account', sortable: true },
      ],
    }
  },
}
</script>
