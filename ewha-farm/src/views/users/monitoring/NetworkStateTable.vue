<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> <strong> 네트워크 현황 </strong> </h3> </b-card-title>
    </div>

    <div>
      <b-table
        :items="networkData"
        :fields="fields"
        :tbody-tr-class="rowColor"
        responsive
        class="mb-0"
      />
    </div>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BTable,
} from 'bootstrap-vue'
import axiosIns from '@/libs/axios'
import { getUserData } from '@/auth/utils'
import { getDateString } from '@core/utils/utils'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
  },
  props: {
    farmId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      networkData: [],
      fields: [
        {
          key: 'farmId.name',
          label: '축사 이름',
          sortable: true,
          tdClass: 'td',
        },
        {
          key: 'deviceId.name',
          label: '함체 이름',
          sortable: true,
          tdClass: 'td',
        },
        { key: 'status', label: '정보', sortable: true },
        {
          key: 'createdAt',
          label: '일자',
          sortable: true,
          formatter: value => getDateString(value),
        },
      ],
    }
  },
  created() {
    this.getNetworkData(this.farmId)
  },
  // setup() {
  //   const networkData = ref(null)
  //   axiosIns.get('network', {
  //     params: { _id: getUserData().id },
  //   }).then(response => {
  //     networkData.value = response.data
  //   }).catch(err => {
  //     console.log(err)
  //   })

  //   return {
  //     networkData,
  //   }
  // },
  methods: {
    getNetworkData(farmId) {
      axiosIns.get('network', {
        params: { _id: getUserData().id, farmId },
      }).then(response => {
        this.networkData = response.data
      }).catch(err => {
        console.log(err)
      })
    },
    rowColor(item, type) {
      if (!item || type !== 'row') {
        return
      }
      if (item.status === 'failure') {
        // eslint-disable-next-line consistent-return
        return 'table-danger'
      }
    },
  },
}
</script>

<style>
.td {
  min-width: 130px;
  overflow: hidden;
}
</style>
