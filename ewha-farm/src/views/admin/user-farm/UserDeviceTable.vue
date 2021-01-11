<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 함체 정보 </h3> </b-card-title>
    </div>

    <div>
      <b-table
        :items="items"
        :fields="fields"
        hover
        responsive
        class="mb-0"
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
  BCard, BCardTitle, BTable, BFormCheckbox, BButton, BRow, BCol, BBadge,
} from 'bootstrap-vue'
import fakeData from '@/data/devices.json'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BButton,
    BFormCheckbox,
    BRow,
    BCol,
    BBadge,
  },
  data() {
    return {
      fields: ['show_details',
        { key: 'id', label: '축사 이름' },
        { key: 'full_name', label: '함체 이름' },
        { key: 'ddns', label: 'DDNS' },
        { key: 'port', label: 'port' },
        { key: 'status', label: 'Status' },
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
}
</script>
