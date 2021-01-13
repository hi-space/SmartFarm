<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 버튼 목록 </h3> </b-card-title>
      <b-card-sub-title> <add-button-modal /> </b-card-sub-title>
    </div>

    <div>
      <b-table
        :items="items"
        :fields="fields"
        hover
        responsive
        class="mb-0"
      />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle, BTable,
} from 'bootstrap-vue'
import fakeData from '@/data/buttons.json'
import AddButtonModal from './AddButtonModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    'add-button-modal': AddButtonModal,
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'type', label: '타입', sortable: true },
        { key: 'info', label: '정보', sortable: true },
        { key: 'relay_num', label: '릴레이 갯수', sortable: true },
        { key: 'signal_type', label: '신호 타입', sortable: true },
        { key: 'operation_time', label: '동작 시간', sortable: true },
      ],
      /* eslint-disable global-require */
      items: fakeData,
    }
  },
}
</script>
