<template>
  <b-card-actions
    title="현재 날씨"
    sub-title="2020-08-21 12:49:50 PM"
    @refresh="refreshStop('cardAction')"
  >
    <b-row>
      <div class="w-100 text-center">
        <h3><b>Snowy</b></h3>
        <p>Seoul</p>
      </div>
    </b-row>
    <b-row>
      <b-col
        class="d-flex justify-content-around"
      >
        <b-img
          src="http://openweathermap.org/img/wn/09d@4x.png"
          alt="logo"
          width="140"
          height="140"
        />
        <h2 class="display-3 font-weight-bolder mt-2"> -6
          <sup>o</sup>
        </h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="item in statisticsItems"
        :key="item.subtitle"
        cols="12"
      >
        <b-media
          no-body
          class="m-2"
        >
          <b-media-aside
            class="mr-2"
          >
            <feather-icon
              size="24"
              :icon="item.icon"
            />
          </b-media-aside>
          <b-media-body class="my-auto">
            <h4 class="font-weight-bolder mb-0">
              {{ item.title }}
            </h4>
          </b-media-body>
          <b-card-text class="font-weight-bolder mb-0">
            <h4 class=" mb-0">
              {{ item.subtitle }}
            </h4>
          </b-card-text>
        </b-media>
      </b-col>
    </b-row>
  </b-card-actions>
</template>

<script>
import {
  BCardText, BRow, BCol, BMedia, BMediaAside, BMediaBody, BImg,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'

export default {
  components: {
    BCardActions,
    BRow,
    BCol,
    BCardText,
    BMedia,
    BMediaAside,
    BMediaBody,
    BImg,
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: 'ThermometerIcon',
          color: 'light-primary',
          title: '체감 온도',
          subtitle: '-8',
        },
        {
          icon: 'DropletIcon',
          color: 'light-info',
          title: '습도',
          subtitle: '60%',
        },
        {
          icon: 'SlidersIcon',
          color: 'light-danger',
          title: '최저/최고 온도',
          subtitle: '-4 ~ 4',
        },
        {
          icon: 'WindIcon',
          color: 'light-success',
          title: '풍량',
          subtitle: '4823 km/h',
        },
        {
          icon: 'DownloadCloudIcon',
          color: 'light-success',
          title: '압력',
          subtitle: '90',
        },
      ],
    }
  },
}
</script>
