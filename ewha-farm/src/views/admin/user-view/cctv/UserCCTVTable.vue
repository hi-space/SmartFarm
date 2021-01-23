<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> CCTV 정보 </h3> </b-card-title>
      <b-card-sub-title> <add-camera-modal /> </b-card-sub-title>
    </div>

    <div>
      <b-table
        :items="cctvData"
        :fields="fields"
        hover
        responsive
        scrollable
        class="position-relative mb-0"
      >
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
  BCard, BCardTitle, BCardSubTitle, BTable, BButton,
} from 'bootstrap-vue'
import store from '@/store'
import AddCameraModal from './AddCameraModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BButton,
    'add-camera-modal': AddCameraModal,
  },
  data() {
    return {
      cctvData: [],
      fields: [
        // { key: '_id', label: 'ID', sortable: true },
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        { key: 'name', label: 'CCTV 이름', sortable: true },
        { key: 'info', label: '정보', sortable: true },
        { key: 'rtspUrl', label: 'rtsp URL', sortable: true },
        { key: 'account', label: 'account', sortable: true },
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
      ],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      store.dispatch('cctv/fetchCCTVs', { userId: store.getters['users/getUserId'] })
        .then(response => {
          this.cctvData = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    remove(row) {
      this.$bvModal
        .msgBoxConfirm('CCTV를 정말 삭제하시겠습니까?', {
          title: 'CCTV 삭제',
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
            store.dispatch('cctv/deleteCCTV', { id: row.item._id })
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
