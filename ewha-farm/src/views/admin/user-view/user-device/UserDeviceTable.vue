<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 함체 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-device-modal /> </b-card-sub-title>
    </div>

    <div>

      <b-table
        :items="items"
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

        <!-- full detail on click -->
        <template #row-details="row">
          <b-card>
            <b-row class="mb-2">
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Full Name : </strong>{{ row.item.full_name }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Post : </strong>{{ row.item.post }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Email : </strong>{{ row.item.email }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>City : </strong>{{ row.item.city }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Salary : </strong>{{ row.item.salary }}
              </b-col>
              <b-col
                md="4"
                class="mb-1"
              >
                <strong>Age : </strong>{{ row.item.age }}
              </b-col>
            </b-row>

            <b-button
              size="sm"
              variant="outline-secondary"
              @click="row.toggleDetails"
            >
              Hide Details
            </b-button>
          </b-card>
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
  BCard, BCardTitle, BCardSubTitle, BTable, BFormCheckbox, BButton, BRow, BCol, BBadge,
} from 'bootstrap-vue'
import fakeData from '@/data/devices.json'
import AddDeviceModal from './AddDeviceModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BButton,
    BFormCheckbox,
    BRow,
    BCol,
    BBadge,
    'add-device-modal': AddDeviceModal,
  },
  data() {
    return {
      fields: [
        { key: 'id', label: 'ID', sortable: true },
        { key: 'farm', label: '축사 이름', sortable: true },
        { key: 'type', label: '장치 타입', sortable: true },
        { key: 'ddns', label: 'DDNS', sortable: true },
        { key: 'port', label: 'port', sortable: true },
        { key: 'account', label: 'account', sortable: true },
        { key: 'serial_num', label: 'S/N', sortable: true },
        // { key: 'show_details', label: 'details' },
      ],
      items: fakeData,
      selected: [],
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
      console.log(this.selected)
    },
  },
}
</script>
