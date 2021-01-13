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
      v-once
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >

      <!-- System Notification Toggler -->
      <!-- <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
          System Notifications
        </h6>
        <b-form-checkbox
          :checked="true"
          switch
        />
      </div> -->

      <!-- System Notifications -->
      <b-link
        v-for="notification in systemNotifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>
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
  BNavItemDropdown, BBadge, BMedia, BLink, BAvatar, BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    // BFormCheckbox,
  },
  directives: {
    Ripple,
  },
  setup() {
    const systemNotifications = [
      {
        title: '서버 연결 실패',
        subtitle: '서버 연결이 실패했습니다',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        title: '커튼 닫음',
        subtitle: '커튼이 자동으로 닫혔습니다',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        title: '온도 센서',
        subtitle: '온도가 너무 높습니다',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
      {
        title: '서버 연결 실패',
        subtitle: '서버 연결이 실패했습니다',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        title: '커튼 닫음',
        subtitle: '커튼이 자동으로 닫혔습니다',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
        title: '온도 센서',
        subtitle: '온도가 너무 높습니다',
        type: 'light-warning',
        icon: 'AlertTriangleIcon',
      },
      {
        title: '서버 연결 실패',
        subtitle: '서버 연결이 실패했습니다',
        type: 'light-danger',
        icon: 'XIcon',
      },
      {
        title: '커튼 닫음',
        subtitle: '커튼이 자동으로 닫혔습니다',
        type: 'light-success',
        icon: 'CheckIcon',
      },
      {
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
      systemNotifications,
      perfectScrollbarSettings,
    }
  },
}
</script>

<style>

</style>
