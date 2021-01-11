<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 농장 정보 </h3> </b-card-title>
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

        <template #cell(status)="data">
          <b-badge :variant="status[1][data.value]">
            {{ status[0][data.value] }}
          </b-badge>
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
import {
  BCard, BCardTitle, BTable, BButton, BRow, BCol, BBadge,
} from 'bootstrap-vue'
import fakeData from '@/data/farms.json'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BButton,
    BRow,
    BCol,
    BBadge,
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
        { key: 'info', label: '정보', sortable: true },
        { key: 'show_details', label: 'details' },
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
