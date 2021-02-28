<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> <strong> 네트워크 현황 </strong> </h3> </b-card-title>
    </div>

    <b-row>
      <b-col cols="12">
        <b-table
          :items="networkData"
          :fields="fields"
          :tbody-tr-class="rowColor"
          :per-page="perPage"
          :current-page="currentPage"
          responsive
          show-empty
          empty-text="데이터가 없습니다"
        />
      </b-col>
      <b-col
        cols="12"
        class="p-2"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="center"
          size="sm"
          class="my-0"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BCardTitle, BTable, BPagination, BRow, BCol,
} from 'bootstrap-vue'
import axiosIns from '@/libs/axios'
import { getUserData } from '@/auth/utils'
import { getDateString } from '@core/utils/utils'

export default {
  components: {
    BCard,
    BCardTitle,
    BTable,
    BPagination,
    BRow,
    BCol,
  },
  props: {
    farmId: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      totalRows: 0,
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
        { key: 'status', label: '상태', sortable: true },
        {
          key: 'createdAt',
          label: '일자',
          sortable: true,
          formatter: value => getDateString(value),
        },
      ],
    }
  },
  methods: {
    getNetworkData(farm) {
      axiosIns.get('network', {
        params: { userId: getUserData().id, farmId: farm },
      }).then(response => {
        this.networkData = response.data
        this.totalRows = response.data.length
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
