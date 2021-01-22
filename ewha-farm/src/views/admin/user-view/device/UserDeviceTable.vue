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
        scrollable
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

        <template #cell(action)="row">
          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="remove(row)"
          >
            <feather-icon icon="Trash2Icon" />
          </b-button>
        </template>
      </b-table>
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle, BTable, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import store from '@/store'
import AddDeviceModal from './AddDeviceModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BFormCheckbox,
    BButton,
    'add-device-modal': AddDeviceModal,
  },
  data() {
    return {
      deviceData: [],
      fields: [
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        { key: 'housingId.name', label: '함체 이름', sortable: true },
        { key: 'name', label: '장비 이름', sortable: true },
        { key: 'type', label: '함체 타입', sortable: true },
        { key: 'port', label: 'port', sortable: true },
        { key: 'account', label: 'account', sortable: true },
        { key: 'serialNum', label: 'S/N', sortable: true },
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
        { key: 'action', label: '삭제' },
        // { key: 'show_details', label: 'details' },
      ],
      selected: [],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
    },

    initData() {
      store.dispatch('device/fetchDevices', { userId: store.state.users.user._id })
        .then(response => {
          this.deviceData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    remove(row) {
      this.$bvModal
        .msgBoxConfirm('통신 장비를 정말 삭제하시겠습니까?', {
          title: '통신 장비 삭제',
          size: 'sm',
          okVariant: 'danger',
          okTitle: '삭제',
          cancelTitle: '취소',
          cancelVariant: 'outline-secondary',
          hideHeaderClose: true,
          centered: true,
        })
        .then(value => {
          if (value === true) {
            store.dispatch('device/deleteDevice', { id: row.item._id })
              .then(() => {
                this.initData()
              }).catch(error => {
                console.log(error)
              })
          }
        })
    },
  },
}
</script>
