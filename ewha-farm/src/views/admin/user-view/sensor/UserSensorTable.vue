<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 센서 정보 </h3> </b-card-title>
      <b-card-sub-title>
        <b-button
          variant="outline-primary"
          class="btn-icon"
          pill
          @click="$refs.addSensorModal.showModal()"
        >
          <span class="align-middle"> 센서 추가</span>
          <feather-icon icon="PlusIcon" />
        </b-button>
        <add-sensor-modal
          ref="addSensorModal"
          @update="initData()"
        />
      </b-card-sub-title>
    </div>

    <div class="table-responsive">
      <b-table
        :items="sensorData"
        :fields="fields"
        responsive
        selectable
        select-mode="single"
        class="mb-0"
      >
        <template #row-details="row">
          <b-card>
            {{ row.item.id }}
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

        <template #cell(action)="row">
          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="$refs.addSensorModal.editModal(row.item)"
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
  BCard, BCardTitle, BCardSubTitle, BTable, BFormCheckbox, BButton,
} from 'bootstrap-vue'
import { getDateString } from '@core/utils/utils'
import store from '@/store'
import { getSensorLabel } from './utils'
import AddSensorModal from './AddSensorModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BFormCheckbox,
    BButton,
    AddSensorModal,
  },
  data() {
    return {
      sensorData: [],
      fields: [
        // { key: '_id', label: '함체 ID', sortable: true },
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        {
          key: 'type',
          label: '센서 타입',
          sortable: true,
          formatter: value => getSensorLabel(value).label,
        },
        {
          key: 'name',
          label: '센서 이름',
          sortable: true,
        },
        // { key: 'ddns', label: 'DDNS', sortable: true },
        // { key: 'port', label: 'Port', sortable: true },
        // { key: 'url', label: 'URL', sortable: true },
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
    initData() {
      store.dispatch('sensor/fetchSensors', { userId: store.getters['users/getUserId'] })
        .then(response => {
          this.sensorData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    remove(row) {
      this.$bvModal
        .msgBoxConfirm('센서를 정말 삭제하시겠습니까?', {
          title: '센서 삭제',
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
            store.dispatch('sensor/deleteSensor', { id: row.item._id })
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
