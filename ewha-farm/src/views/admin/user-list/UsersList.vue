<template>
  <div>
    <!-- Filters -->
    <!-- <users-list-filters
      :role-filter.sync="roleFilter"
      :plan-filter.sync="planFilter"
      :status-filter.sync="statusFilter"
      :role-options="roleOptions"
      :status-options="statusOptions"
    /> -->

    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >

      <div class="m-2">
        <!-- Table Top -->
        <b-row>

          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :options="pageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-group
                label-for="filter-input"
                label-align-sm="right"
                class="mb-0"
              >
                <b-input-group>
                  <b-form-input
                    id="filter-input"
                    v-model="filter"
                    type="search"
                    placeholder="Search..."
                  />
                </b-input-group>
              </b-form-group>
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="refUserListTable"
        class="position-relative"
        :items="userListData"
        :fields="tableColumns"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        primary-key="_id"
        hover
        responsive
        show-empty
        selectable
        select-mode="single"
        empty-text="No matching records found"
        @row-selected="onRowSelected"
      >

        <!-- Column: User -->
        <template #cell(user)="data">
          <b-media vertical-align="center">
            <template #aside>
              <b-avatar
                size="32"
                :text="avatarText(data.item.userInfo.name)"
                :variant="`light-${resolveUserRoleVariant(data.item.userInfo.role)}`"
                :to="{ name: 'user-view', params: { id: data.item._id } }"
              />
            </template>
            <b-link
              :to="{ name: 'user-view', params: { id: data.item._id } }"
              class="font-weight-bold d-block text-nowrap"
            >
              {{ data.item.userInfo.name }}
            </b-link>
            <small class="text-muted">{{ data.item.userInfo.info }}</small>
          </b-media>
        </template>

        <!-- Column: Role -->
        <template #cell(role)="data">
          <div class="text-nowrap">
            <feather-icon
              :icon="resolveUserRoleIcon(data.item.userInfo.role)"
              size="18"
              class="mr-50"
              :class="`text-${resolveUserRoleVariant(data.item.userInfo.role)}`"
            />
            <span class="align-text-top text-capitalize">{{ data.item.userInfo.role }}</span>
          </div>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveUserStatusVariant(data.item.userInfo.status)}`"
            class="text-capitalize"
            @click="toggleStatus(data.item._id, data.item.userInfo.status)"
          >
            {{ data.item.userInfo.status }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>

            <b-dropdown-item :to="{ name: 'user-view', params: { id: data.item._id } }">
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item>
          </b-dropdown>
        </template>

      </b-table>
      <div class="mx-2 mb-2">
        <b-row>

          <b-col
            cols="12"
            sm="6"
            class="d-flex align-items-center justify-content-center justify-content-sm-start"
          >
            <span class="text-muted">Showing {{ totalUsers }} users</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="d-flex justify-content-sm-end"
          >

            <b-pagination
              v-model="currentPage"
              :total-rows="totalUsers"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>

        </b-row>
      </div>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BRow, BCol, BFormInput, BTable, BMedia, BAvatar, BLink,
  BBadge, BDropdown, BDropdownItem, BPagination, BFormGroup, BInputGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { ref } from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'
import store from '@/store'

import userListTable from './userListTable'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,
    BFormGroup,
    BInputGroup,
    vSelect,

    // UsersListFilters,
  },
  data() {
    return {
      tableColumns: [
        {
          key: 'user',
          sortable: true,
        },
        {
          label: 'phone',
          key: 'userInfo.phone',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          label: 'address',
          key: 'userInfo.address',
          sortable: true,
          sortByFormatted: true,
          filterByFormatted: true,
        },
        {
          label: 'role',
          key: 'role',
        },
        {
          label: 'status',
          key: 'status',
        },
        {
          label: '생성일',
          key: 'createdAt',
        },
        // { key: 'actions' },
      ],

      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15, 20],
      sortDirection: 'asc',
      filter: null,
      selectedRow: [],
    }
  },
  setup() {
    const totalUsers = ref(0)
    const userListData = ref(null)

    store
      .dispatch('users/fetchUsers')
      .then(response => {
        const users = response.data
        userListData.value = users
        totalUsers.value = users.length
      })
      .catch(err => {
        console.log(err)
        console.log('Error fetching users list')
      })

    const roleOptions = [
      { label: '관리자', value: 'admin' },
      { label: '담당자', value: 'manager' },
      { label: '고객', value: 'customer' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]

    const {
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
    } = userListTable()

    return {
      resolveUserRoleVariant,
      resolveUserRoleIcon,
      resolveUserStatusVariant,
      avatarText,

      roleOptions,
      statusOptions,

      userListData,
      totalUsers,
    }
  },
  methods: {
    onRowSelected(items) {
      this.selectedRow = items
      this.$router.push({ name: 'user-view', params: { id: this.selectedRow[0]._id } })
    },
    toggleStatus(userId, status) {
      if (status === 'inactive' || status === 'pending') {
        this.$bvModal
          .msgBoxConfirm('이 사용자를 승인하시겠습니까?', {
            title: '사용자 상태 변경',
            size: 'sm',
            okVariant: 'primary',
            okTitle: '승인',
            cancelTitle: '취소',
            cancelVariant: 'outline-secondary',
            hideHeaderClose: true,
            centered: true,
          })
          .then(value => {
            if (value === true) {
              console.log(userId)
            }
          })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
