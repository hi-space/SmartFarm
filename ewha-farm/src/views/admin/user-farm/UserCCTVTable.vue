<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> CCTV 정보 </h3> </b-card-title>
    </div>

    <div>
      <b-table
        :items="items"
        :fields="fields"
        hover
        responsive
        class="mb-0"
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
  BCard, BCardTitle, BTable, BBadge,
} from 'bootstrap-vue'
import fakeData from '@/data/cctv.json'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BBadge,
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'name', label: 'CCTV 이름' },
        { key: 'info', label: '정보' },
        { key: 'rtsp', label: 'rtsp URL' },
        { key: 'account', label: 'account' },
      ],
      /* eslint-disable global-require */
      items: fakeData,
    }
  },
}
</script>
