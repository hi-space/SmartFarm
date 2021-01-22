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
        scrollable
        class="mb-0"
      />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BCardSubTitle, BTable,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import fakeData from '@/data/buttons.json'
import store from '@/store'
import AddButtonModal from './AddButtonModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    'add-button-modal': AddButtonModal,
  },
  setup() {
    const buttonData = ref(null)
    store.dispatch('button/fetchButtons', { userId: store.state.users.user._id })
      .then(response => {
        buttonData.value = response.data
      })
      .catch(err => {
        console.log(err)
      })
    return {
      buttonData,
    }
  },
  data() {
    return {
      fields: [
        { key: 'name', label: '이름', sortable: true },
        {
          key: 'type',
          label: '타입',
          sortable: true,
          formatter: value => {
            console.log(value)
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
      ],
      /* eslint-disable global-require */
      items: fakeData,
    }
  },
}
</script>
