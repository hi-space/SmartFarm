<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> CCTV 정보 </h3> </b-card-title>
      <b-card-sub-title>
        <!-- Button -->
        <b-button
          variant="outline-primary"
          class="btn-icon"
          pill
          @click="$refs.addCameraModal.showModal()"
        >
          <span class="align-middle"> CCTV 추가</span>
          <feather-icon icon="PlusIcon" />
        </b-button>

        <add-camera-modal
          ref="addCameraModal"
          @update="initData()"
        />
      </b-card-sub-title>
    </div>

    <div class="table-responsive">
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
            @click="updateStream(row.item)"
          >
            <feather-icon icon="RefreshCwIcon" />
          </b-button>

          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="$refs.addCameraModal.editModal(row.item)"
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
import axiosIns from '@/libs/axios'
import { getDateString } from '@core/utils/utils'
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
        // { key: 'info', label: '정보', sortable: true },
        { key: 'rtspUrl', label: 'rtsp URL', sortable: true },
        { key: 'streamingUrl', label: 'streming URL', sortable: true },
        // { key: 'relayUrl', label: 'relay URL', sortable: true },
        { key: 'account', label: 'account', sortable: true },
        {
          label: '생성일자',
          key: 'createdAt',
          sortable: true,
          formatter: value => getDateString(value),
        },
        { key: 'action', label: '수정' },
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
    updateStream(row) {
      axiosIns.put(`cctv/${row._id}/stream`, row).then(response => {
        console.log(response)
      }).catch(err => {
        console.log(err)
      })
    },
  },
}
</script>
