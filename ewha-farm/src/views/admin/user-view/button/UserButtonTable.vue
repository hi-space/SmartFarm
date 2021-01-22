<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 버튼 목록 </h3> </b-card-title>
      <b-card-sub-title> <add-button-modal /> </b-card-sub-title>
    </div>

    <div>
      <b-table
        :items="buttonData"
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
          formatter: value => {
            if (value === 'curtain') {
              return '커튼'
            }
            if (value === 'ceiling') {
              return '천장'
            }
            if (value === 'feeder') {
              return '사료급이기'
            }
            if (value === 'light') {
              return '조명'
            }
            if (value === 'fan') {
              return '선풍기'
            }
            if (value === 'sprayer') {
              return '안개분무기'
            }
            return ''
          },
        },
        { key: 'buttonSetting.relayCount', label: '릴레이 갯수', sortable: true },
        { key: 'buttonSetting.signalType', label: '신호 타입', sortable: true },
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
      store.dispatch('button/fetchButtons', { userId: store.state.users.user._id })
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
