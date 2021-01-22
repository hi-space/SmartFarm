<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 센서 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-sensor-modal /> </b-card-sub-title>
    </div>

    <div>

      <b-table
        :items="sensorData"
        :fields="fields"
        hover
        responsive
        selectable
        select-mode="single"
        class="mb-0"
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
import AddSensorModal from './AddSensorModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BFormCheckbox,
    BBadge,
    AddSensorModal,
  },
  setup() {
    const sensorData = ref(null)
    store.dispatch('sensor/fetchSensors', { userId: store.state.users.user._id })
      .then(response => {
        sensorData.value = response.data
      })
      .catch(error => {
        console.log(error)
      })

    return {
      sensorData,
    }
  },
  data() {
    return {
      fields: [
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        // { key: '_id', label: '함체 ID', sortable: true },
        {
          key: 'type',
          label: '센서 타입',
          sortable: true,
          formatter: value => {
            if (value === 'temperature') {
              return '온도 센서'
            }
            if (value === 'humidity') {
              return '습도 센서'
            }
            if (value === 'rain') {
              return '우적 센서'
            }
            if (value === 'hs2') {
              return '황화수소'
            }
            if (value === 'nh3') {
              return '암모니아'
            }
            return ''
          },
        },
        { key: 'name', label: '센서 이름', sortable: true },
        {
          label: '생성일자',
          key: 'createdAt',
          sortable: true,
          formatter: value => {
            const date = new Date(value)
            const y = date.getFullYear()
            const m = 1 + date.getMonth()
            const d = date.getDate()
            const h = date.getHours()
            const mm = date.getMinutes()
            return `${y}/${m}/${d} ${h}:${mm}`
          },
        },
      ],
      selected: [],
    }
  },
}
</script>
