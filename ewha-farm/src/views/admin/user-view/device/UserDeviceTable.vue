<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 통신 장비 정보 </h3> </b-card-title>
      <b-card-sub-title>
        <!-- Button -->
        <b-button
          variant="outline-primary"
          class="btn-icon"
          pill
          @click="$refs.addDeviceModal.showModal()"
        >
          <span class="align-middle"> 통신 장비 추가</span>
          <feather-icon icon="PlusIcon" />
        </b-button>

        <add-device-modal
          ref="addDeviceModal"
          @update="initData()"
        />

        <add-relay-modal
          ref="addRelayModal"
        />

      </b-card-sub-title>
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
      >
        <template #cell(action)="row">
          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="$refs.addRelayModal.show(row.item)"
            @update="initData()"
          >
            <feather-icon icon="SettingsIcon" />
          </b-button>

          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="$refs.addDeviceModal.editModal(row.item)"
          >
            <feather-icon icon="EditIcon" />
          </b-button>

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
  BCard, BCardTitle, BCardSubTitle, BTable, BButton,
} from 'bootstrap-vue'
import store from '@/store'
import { getDateString } from '@core/utils/utils'
import AddDeviceModal from './AddDeviceModal.vue'
import AddRelayModal from './AddRelayModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BButton,
    'add-device-modal': AddDeviceModal,
    AddRelayModal,
  },
  data() {
    return {
      deviceData: [],
      fields: [
        // { key: '_id', label: '축사 ID', sortable: true },
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        // { key: 'housingId.name', label: '함체 이름', sortable: true },
        { key: 'name', label: '장비 이름', sortable: true },
        { key: 'channel', label: '채널', sortable: true },
        { key: 'ddns', label: 'ddns', sortable: true },
        { key: 'port', label: 'port', sortable: true },
        // { key: 'account', label: 'account', sortable: true },
        // { key: 'serialNum', label: 'S/N', sortable: true },
        {
          label: '생성일자',
          key: 'createdAt',
          sortable: true,
          formatter: value => getDateString(value),
        },
        { key: 'action', label: '수정' },
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
      store.dispatch('device/fetchDevices', { userId: store.getters['users/getUserId'] })
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
