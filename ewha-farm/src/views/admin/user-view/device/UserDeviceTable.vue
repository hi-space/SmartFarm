<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 통신 장비 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-device-modal /> </b-card-sub-title>
    </div>

    <div>

      <b-table
        :items="deviceData"
        :fields="fields"
        hover
        responsive
        selectable
        select-mode="single"
        class="mb-0"
        @row-selected="onRowSelected"
      >
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
            v-model="row.detailsShowing"
            @change="row.toggleDetails"
          >
            <!-- {{ row.detailsShowing ? 'Hide' : 'Show' }} -->
          </b-form-checkbox>
        </template>

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
  BCard, BCardTitle, BCardSubTitle, BTable, BFormCheckbox, BBadge,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import store from '@/store'
import AddDeviceModal from './AddDeviceModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BFormCheckbox,
    BBadge,
    'add-device-modal': AddDeviceModal,
  },
  setup() {
    const deviceData = ref(null)
    store.dispatch('device/fetchDevices', { userId: store.state.users.user._id })
      .then(response => {
        deviceData.value = response.data
        // console.log(response)
      })
      .catch(error => {
        console.log(error)
      })

    return {
      deviceData,
    }
  },
  data() {
    return {
      fields: [
        { key: 'farmId', label: '축사 Id', sortable: true },
        { key: 'housingId', label: '함체 Id', sortable: true },
        { key: 'name', label: '장비 이름', sortable: true },
        { key: 'type', label: '함체 타입', sortable: true },
        { key: 'port', label: 'port', sortable: true },
        { key: 'account', label: 'account', sortable: true },
        { key: 'serialNum', label: 'S/N', sortable: true },
        // { key: 'show_details', label: 'details' },
      ],
      selected: [],
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
      // console.log(this.selected)
    },
  },
}
</script>
