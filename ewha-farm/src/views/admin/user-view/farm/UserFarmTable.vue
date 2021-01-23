<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 축사 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-farm-modal /> </b-card-sub-title>
    </div>

    <div>
      <b-table
        :items="farmData"
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
  BCard, BCardTitle, BCardSubTitle, BTable, BButton, BRow, BCol,
} from 'bootstrap-vue'

import store from '@/store'

import AddFarmModal from './AddFarmModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BButton,
    BRow,
    BCol,
    'add-farm-modal': AddFarmModal,
  },
  data() {
    return {
      farmData: [],
      fields: [
        // { key: '_id', label: '축사 ID', sortable: true },
        {
          key: 'name',
          label: '축사 이름',
          sortable: true,
          isRowHeader: true,
        },
        { key: 'info', label: '정보', sortable: true },
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
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      store.dispatch('farm/fetchFarms', { userId: store.getters['users/getUserId'] })
        .then(response => {
          this.farmData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    remove(row) {
      this.$bvModal
        .msgBoxConfirm('농장에 등록된 모든 정보가 사라집니다.', {
          title: '축사 삭제',
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
            store.dispatch('farm/deleteFarm', { id: row.item._id })
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
