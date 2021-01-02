<template>
  <b-card-actions
    title="농장 환경"
    action-collapse
  >
    <b-row>
      <b-col
        v-for="item in statisticsItems"
        :key="item.subtitle"
        class="mb-2"
        lg="6"
        sm="12"
      >
        <b-media
          no-body
          class="ml-2 mr-2 mt-2"
        >
          <b-media-aside
            class="mr-2"
          >
            <b-avatar
              size="48"
              :variant="item.color"
            >
              <feather-icon
                size="24"
                :icon="item.icon"
              />
            </b-avatar>
          </b-media-aside>
          <b-media-body class="my-auto">
            <h4 class="font-weight-bolder mb-0">
              {{ item.title }}
            </h4>
            <b-card-text class="font-small-3 mb-0">
              {{ item.subtitle }}
            </b-card-text>
          </b-media-body>
        </b-media>
      </b-col>
    </b-row>
  </b-card-actions>
</template>

<script>
import {
  BCardText, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

export default {
  components: {
    BCardActions,
    BRow,
    BCol,
    BCardText,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: 'ThermometerIcon',
          color: 'light-primary',
          title: '21',
          subtitle: '온도',
        },
        {
          icon: 'humidity',
          color: 'light-info',
          title: '8',
          subtitle: '습도',
        },
        {
          icon: 'UmbrellaIcon',
          color: 'light-danger',
          title: 'ON',
          subtitle: '우적 센서',
        },
        {
          icon: 'CpuIcon',
          color: 'light-success',
          title: '30 ppm',
          subtitle: '황화수소',
        },
        {
          icon: 'CpuIcon',
          color: 'light-success',
          title: '45 ppm',
          subtitle: '암모니아',
        },
      ],
    }
  },
}
</script>
