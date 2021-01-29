<template>
  <b-card
    no-body
  >
    <div class="card-header">
      <!-- Title -->
      <b-card-title> <h3> 함체 정보 </h3> </b-card-title>
      <b-card-sub-title>
        <b-button
          variant="outline-primary"
          class="btn-icon"
          pill
          @click="$refs.addHousingModal.showModal()"
        >
          <span class="align-middle"> 함체 추가</span>
          <feather-icon icon="PlusIcon" />
        </b-button>

        <add-housing-modal
          ref="addHousingModal"
          @update="initData()"
        />
      </b-card-sub-title>
    </div>

    <div>

      <b-table
        :items="housingData"
        :fields="fields"
        hover
        responsive
        selectable
        scrollable
        select-mode="single"
        class="mb-0"
        @row-selected="onRowSelected"
      >
        <template #row-details="row">
          <b-card>
            {{ row.item.id }}
            <!-- <user-device-table /> -->
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
            @click="$refs.addHousingModal.editModal(row.item)"
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
import store from '@/store'
import AddHousingModal from './AddHousingModal.vue'

export default {
  components: {
    BCard,
    BCardTitle,
    BCardSubTitle,
    BTable,
    BFormCheckbox,
    BButton,
    AddHousingModal,
  },
  data() {
    return {
      housingData: [],
      fields: [
        {
          key: 'farmId.name',
          label: '축사 이름',
          sortable: true,
          tdClass: 'td',
        },
        {
          key: 'name',
          label: '함체 이름',
          sortable: true,
          tdClass: 'td',
        },
        {
          key: 'info',
          label: '함체 정보',
          sortable: true,
          tdClass: 'td',
        },
        { key: 'ddns', label: 'DDNS', sortable: true },
        { key: 'port', label: 'port', sortable: true },
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
        { key: 'action', label: '수정' },
        // { key: 'show_details', label: 'details' },
      ],
      selected: [],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    onRowSelected(items) {
      this.selected = items
    },
    initData() {
      store.dispatch('housing/fetchHousings', { userId: store.getters['users/getUserId'] })
        .then(response => {
          this.housingData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    remove(row) {
      this.$bvModal
        .msgBoxConfirm('함체를 정말 삭제하시겠습니까?', {
          title: '함체 삭제',
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
            store.dispatch('housing/deleteHousing', { id: row.item._id })
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

<style>
.td {
  min-width: 130px;
  overflow: hidden;
}
</style>
