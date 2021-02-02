<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        badge="9"
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
          9 New
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
        :key="item.id"
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
          @click.stop="removeItem(item.id)"
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
    <li class="dropdown-menu-footer"><b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
    >모든 알림 제거</b-button>
    </li>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BAvatar, BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    // BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  setup() {
    const notiItems = [
      {
        id: 1,
        title: '서버 연결 실패',
        subtitle: '서버 연결이 실패했습니다',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        id: 2,
        title: '커튼 닫음',
        subtitle: '커튼이 자동으로 닫혔습니다',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        id: 3,
        title: '온도 센서',
        subtitle: '온도가 너무 높습니다',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
      {
        id: 4,
        title: '서버 연결 실패',
        subtitle: '서버 연결이 실패했습니다',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        id: 5,
        title: '커튼 닫음',
        subtitle: '커튼이 자동으로 닫혔습니다',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        id: 6,
        title: '온도 센서',
        subtitle: '온도가 너무 높습니다',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
      {
        id: 7,
        title: '서버 연결 실패',
        subtitle: '서버 연결이 실패했습니다',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        id: 8,
        title: '커튼 닫음',
        subtitle: '커튼이 자동으로 닫혔습니다',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        id: 9,
        title: '온도 센서',
        subtitle: '온도가 너무 높습니다',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
    ]

    const perfectScrollbarSettings = {
      maxScrollbarLength: 60,
      wheelPropagation: false,
    }

    return {
      notiItems,
      perfectScrollbarSettings,
    }
  },
  methods: {
    removeItem(id) {
      console.log(id)
      const itemIndex = this.notiItems.findIndex(p => p.id === id)
      this.notiItems.splice(itemIndex, 1)
    },
  },
}
</script>
