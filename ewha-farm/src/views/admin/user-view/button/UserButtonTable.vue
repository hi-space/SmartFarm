<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 버튼 목록 </h3> </b-card-title>
      <b-card-sub-title>
        <!-- Button -->
        <b-button
          variant="outline-primary"
          class="btn-icon"
          pill
          @click="$refs.addButtonModal.showModal()"
        >
          <span class="align-middle"> 버튼 추가</span>
          <feather-icon icon="PlusIcon" />
        </b-button>

        <add-button-modal
          ref="addButtonModal"
          @update="initData()"
        />
      </b-card-sub-title>
    </div>

    <div class="table-responsive">
      <b-table
        :items="buttonData"
        :fields="fields"
        responsive
        selectable
        select-mode="single"
        class="mb-0"
      >
        <template #cell(action)="row">
          <b-button
            size="sm"
            class="btn-icon"
            variant="flat"
            @click="$refs.addButtonModal.editModal(row.item)"
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
import { getButtonLabel } from './utils'
import AddButtonModal from './AddButtonModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BButton,
    'add-button-modal': AddButtonModal,
  },
  data() {
    return {
      buttonData: [],
      fields: [
        { key: 'farmId.name', label: '축사 이름', sortable: true },
        { key: 'name', label: '이름', sortable: true },
        {
          key: 'type',
          label: '타입',
          sortable: true,
          formatter: value => getButtonLabel(value).label,
        },
        // { key: 'ddns', label: 'DDNS', sortable: true },
        // { key: 'url', label: 'URL', sortable: true },
        { key: 'buttonSetting.relayCount', label: '릴레이 갯수', sortable: true },
        // {
        //   key: 'buttonSetting.signalType',
        //   label: '신호 타입',
        //   sortable: true,
        //   formatter: value => getSignalLabel(value).label,
        // },
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
      store.dispatch('button/fetchButtons', { userId: store.getters['users/getUserId'] })
        .then(response => {
          this.buttonData = response.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    remove(row) {
      this.$bvModal
        .msgBoxConfirm('버튼을 정말 삭제하시겠습니까?', {
          title: '버튼 삭제',
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
            store.dispatch('button/deleteButton', { id: row.item._id })
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
