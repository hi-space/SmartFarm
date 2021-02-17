<template>
  <b-card-actions
    title="농장 환경"
    action-collapse
  >
    <b-row>
      <b-col
        v-for="item in sensorItems"
        :key="item._id"
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
      sensorItems: [],
    }
  },
  methods: {
    async updateUI(sensorData) {
      sensorData.forEach(el => {
        let icon = 'CpuIcon'
        let color = 'light-primary'
        let postfix = ''
        if (el.type === 'temperature') {
          icon = 'ThermometerIcon'
          color = 'light-danger'
          postfix = '°C'
        } else if (el.type === 'humidity') {
          icon = 'DropletIcon'
          color = 'light-warning'
        } else if (el.type === 'rain') {
          color = 'light-info'
          icon = 'UmbrellaIcon'
        } else {
          postfix = 'ppm'
        }

        this.sensorItems.push({
          id: el._id,
          icon,
          color,
          title: `${el.lastValue || 0} ${postfix}`,
          subtitle: el.name,
        })
      })
    },
  },
}
</script>
