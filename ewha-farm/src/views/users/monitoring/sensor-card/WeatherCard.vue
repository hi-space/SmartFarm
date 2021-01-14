<template>
  <b-card-actions
    ref="weatherCard"
    title="현재 날씨"
    :sub-title="getCurrentTime()"
    @refresh="getWeatherData"
  >
    <b-row>
      <div class="w-100 text-center">
        <h1><b>{{ weather.toUpperCase() }}</b></h1>
        <h3><p> {{ location }} </p></h3>
      </div>
    </b-row>
    <b-row>
      <b-col
        class="d-flex justify-content-around"
      >
        <b-img
          :src="icon"
          alt="logo"
          width="140"
          height="140"
        />
        <h2 class="display-3 font-weight-bolder mt-2"> {{ temp }}
          <sup>o</sup>
        </h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        v-for="item in statisticsItems"
        :key="item.icon"
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
            <h4 class="mb-0">
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
import axios from '@axios'

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
      location: '',
      weather: '',
      icon: '',
      temp: '',
      temp_min: '',
      temp_max: '',
      pressure: '',
      humidity: '',
      wind_speed: '',
      wind_deg: '',
    }
  },
  computed: {
    statisticsItems() {
      return [
        {
          icon: 'ThermometerIcon',
          color: 'light-primary',
          title: '온도',
          subtitle: this.temp,
        },
        {
          icon: 'DropletIcon',
          color: 'light-info',
          title: '습도',
          subtitle: this.humidity,
        },
        {
          icon: 'SlidersIcon',
          color: 'light-danger',
          title: '최저/최고 온도',
          subtitle: `${this.temp_min} ~ ${this.temp_max}`,
        },
        {
          icon: 'WindIcon',
          color: 'light-success',
          title: '풍속',
          subtitle: `${this.wind_speed} km/h`,
        },
        {
          icon: 'DownloadCloudIcon',
          color: 'light-success',
          title: '압력',
          subtitle: this.pressure,
        },
      ]
    },
  },
  created() {
    this.getWeatherData()
  },
  methods: {
    getCurrentTime() {
      return new Date().toLocaleString()
    },
    async getWeatherData() {
      const parmas = {
        lat: 37.57,
        lon: 126.98,
      }

      try {
        const result = await axios.get('/utils/weather', { params: parmas })
        this.location = result.data.location.toUpperCase()
        this.temp = result.data.temp.toFixed(1)
        this.pressure = result.data.pressure
        this.temp_max = result.data.temp_max
        this.temp_min = result.data.temp_min
        this.humidity = result.data.humidity
        this.weather = result.data.weather
        this.wind_deg = result.data.wind_deg
        this.wind_speed = result.data.wind_speed
        this.icon = result.data.icon
      } catch (err) {
        console.log(err)
      }

      this.$refs.weatherCard.showLoading = false
    },
  },
}
</script>
