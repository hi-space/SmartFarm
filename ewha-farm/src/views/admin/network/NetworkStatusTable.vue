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
          hover
          responsive
          show-empty
          empty-text="데이터가 없습니다"
        >
          <template #cell(show_details)="row">
            <b-form-checkbox
              v-model="row.detailsShowing"
              plain
              class="vs-checkbox-con"
              @change="row.toggleDetails"
            >
              <span class="vs-checkbox">
                <span class="vs-checkbox--check">
                  <i class="vs-icon feather icon-check" />
                </span>
              </span>
              <span class="vs-label">{{ row.detailsShowing ? 'Hide' : 'Show' }}</span>
            </b-form-checkbox>
          </template>

          <template #row-details="row">
            <b-row>
              <b-col
                cols="11"
                sm="10"
              >
                <b-form-textarea
                  v-model="row.item.msg"
                />
              </b-col>
              <b-col
                cols="1"
                sm="2"
                class="text-center"
              >
                <b-button
                  variant="outline-primary"
                  class="text-center h-100"
                  size="sm"
                  block
                  @click="updateData(row.item)"
                >
                  저장
                </b-button>
              </b-col>
            </b-row>
          </template>
        </b-table>
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
  BCard, BCardTitle, BTable, BCol, BRow, BPagination, BFormCheckbox, BFormTextarea, BButton,
} from 'bootstrap-vue'
import { ref } from '@vue/composition-api'
import axiosIns from '@/libs/axios'
import { getDateString } from '@/@core/utils/utils'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BCard,
    BCol,
    BRow,
    BCardTitle,
    BTable,
    BPagination,
    BFormCheckbox,
    BFormTextarea,
    BButton,
  },
  data() {
    return {
      perPage: 10,
      currentPage: 1,
      fields: [
        {
          key: 'userId.userInfo.name',
          label: '사용자 이름',
          sortable: true,
          tdClass: 'td',
        },
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
        { key: 'command', label: '명령어', sortable: true },
        { key: 'status', label: '정보', sortable: true },
        {
          key: 'createdAt',
          label: '일자',
          sortable: true,
          formatter: value => getDateString(value),
        },
        { key: 'show_details', label: '메모' },
      ],
    }
  },
  setup() {
    const networkData = ref(null)
    const totalRows = ref(null)

    axiosIns.get(`network/${getUserData().id}`).then(response => {
      networkData.value = response.data
      totalRows.value = response.data.length
    }).catch(err => {
      console.log(err)
    })

    return {
      networkData,
      totalRows,
    }
  },
  methods: {
    updateData(item) {
      console.log(item)
      axiosIns.put(`network/${item._id}`, item).then(response => {
        console.log(response)
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
