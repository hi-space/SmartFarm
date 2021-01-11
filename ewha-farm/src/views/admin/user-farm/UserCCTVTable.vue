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
        :items="items"
        :fields="fields"
        hover
        responsive
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
import fakeData from '@/data/cctv.json'
import AddCameraModal from '../register/AddCameraModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BBadge,
    'add-camera-modal': AddCameraModal,
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'farm', label: '축사 이름', sortable: true },
        { key: 'name', label: 'CCTV 이름', sortable: true },
        { key: 'info', label: '정보', sortable: true },
        { key: 'rtsp', label: 'rtsp URL', sortable: true },
        { key: 'account', label: 'account', sortable: true },
      ],
      /* eslint-disable global-require */
      items: fakeData,
    }
  },
}
</script>
