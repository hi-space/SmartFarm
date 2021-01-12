<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> <strong> 네트워크 현황 </strong> </h3> </b-card-title>
    </div>

    <div>
      <b-table
        :items="items"
        :fields="fields"
        :tbody-tr-class="rowColor"
        hover
        responsive
        class="mb-0"
      />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BTable,
} from 'bootstrap-vue'
import fakeData from '@/data/network-state.json'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
  },
  data() {
    return {
      fields: [
        { key: 'farm_name', label: '축사 이름', sortable: true },
        { key: 'device_name', label: '함체 이름', sortable: true },
        { key: 'status', label: '정보', sortable: true },
        { key: 'timestamp', label: '생성일', sortable: true },
      ],
      /* eslint-disable global-require */
      items: fakeData,
      /* eslint-disable global-require */
      status: [{
        1: 'Current', 2: 'Professional', 3: 'Rejected', 4: 'Resigned', 5: 'Applied',
      },
      {
        1: 'light-primary', 2: 'light-success', 3: 'light-danger', 4: 'light-warning', 5: 'light-info',
      }],
    }
  },
  methods: {
    rowColor(item, type) {
      if (!item || type !== 'row') {
        return
      }
      if (item.status === 'failure') {
        // eslint-disable-next-line consistent-return
        return 'table-danger'
      }
    },
  },
}
</script>
