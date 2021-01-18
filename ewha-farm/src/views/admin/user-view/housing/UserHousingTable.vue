<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 함체 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-housing-modal /> </b-card-sub-title>
    </div>

    <div>

      <b-table
        :items="housingData"
        :fields="fields"
        hover
        responsive
        selectable
        select-mode="single"
        class="mb-0"
        @row-selected="onRowSelected"
      >
        <template #row-details="row">
          <b-card>
            {{ row.item.id }}
            <!-- <user-device-table /> -->
          </b-card>
        </template>
        <template #cell(show_details)="row">

          <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          <b-form-checkbox
            v-model="row.detailsShowing"
            @change="row.toggleDetails"
          >
            {{ row.detailsShowing ? 'Hide' : 'Show' }}
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
import AddHousingModal from './AddHousingModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BFormCheckbox,
    BBadge,
    AddHousingModal,
  },
  setup() {
    const housingData = ref(null)
    store.dispatch('housing/fetchHousings', { userId: store.state.users.user._id })
      .then(response => {
        housingData.value = response.data
        // console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })

    return {
      housingData,
    }
  },
  data() {
    return {
      fields: [
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        // { key: '_id', label: '함체 ID', sortable: true },
        { key: 'name', label: '함체 이름', sortable: true },
        { key: 'info', label: '함체 정보', sortable: true },
        { key: 'ddns', label: 'DDNS', sortable: true },
        { key: 'port', label: 'port', sortable: true },
        { key: 'account', label: 'account', sortable: true },
        // { key: 'show_details', label: 'details' },
      ],
      selected: [],
    }
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
    },
  },
}
</script>
