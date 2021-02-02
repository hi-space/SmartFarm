<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        :badge="notiItems.length"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          알림
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ notiItems.length }} New
        </b-badge>
      </div>
    </li>

    <!-- Notifications -->
    <vue-perfect-scrollbar
      v-if="notiItems.length"
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >

      <!-- System Notifications -->
      <b-media
        v-for="item in notiItems"
        :key="item._id"
      >
        <template #aside>
          <b-avatar
            size="32"
            :variant="item.type"
          >
            <feather-icon :icon="item.icon" />
          </b-avatar>
        </template>

        <feather-icon
          icon="XIcon"
          class="cursor-pointer cart-item-remove"
          @click.stop="removeItem(item._id)"
        />
        <p class="media-heading">
          <span class="font-weight-bolder">
            {{ item.title }}
          </span>
        </p>
        <small class="item-text">{{ item.subtitle }}</small>
      </b-media>
      <!-- </b-link> -->
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <!-- <li class="dropdown-menu-footer"><b-button
      variant="primary"
      block
    >모든 알림 제거</b-button>
    </li> -->
    <p
      v-if="!notiItems.length"
      class="m-0 p-1 text-center"
    >
      새로운 알림이 없습니다
    </p>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BAvatar,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { getUserData } from '@/auth/utils'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BAvatar,
    VuePerfectScrollbar,
    // BButton,
    // BFormCheckbox,
  },
  data() {
    return {
      notiItems: [],
    }
  },
  created() {
    this.getPushList()
  },
  setup() {
    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      perfectScrollbarSettings,
    }
  },
  methods: {
    async getPushList() {
      this.notiItems = (await this.$store.dispatch('push/fetchPush', { id: getUserData().id })).data
      console.log(this.notiItems)
    },
    removeItem(id) {
      console.log(id)
      this.$store.dispatch('push/deletePush', { id: getUserData().id, pushId: id })

      const itemIndex = this.notiItems.findIndex(p => p._id === id)
      this.notiItems.splice(itemIndex, 1)
    },
  },
}
</script>
