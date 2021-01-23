<template>
  <div>
    <b-button
      variant="gradient-primary"
      size="sm"
      block
      @click="toggleSettingList"
    >
      자동화 동작
    </b-button>

    <!-- collapse -->
    <b-collapse
      ref="autoSettings"
      class="mt-2"
      visible
    >
      <draggable
        v-model="settingList"
        class="list-group list-group-flush cursor-move"
        tag="ul"
      >
        <transition-group
          type="transition"
          name="flip-list"
        >
          <b-list-group-item
            v-for="listItem in settingList"
            :key="listItem._id"
            tag="li"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b-badge
                :variant="modeColor"
                class="badge-round text-center"
              >
                {{ getMode(listItem.mode) }}
              </b-badge>
              <b-card-text
                v-if="listItem.mode === 'time'"
                class="font-weight-bold mb-0"
              >
                <strong> {{ getTime(listItem.startTime) }} </strong> 부터 <br>
                <strong> {{ getTime(listItem.endTime) }} </strong> 까지
              </b-card-text>
              <b-card-text
                v-if="listItem.mode === 'periodic'"
                class="font-weight-bold mb-0"
              >
                <strong> {{ getPeriodic(listItem.periodic) }} </strong>마다
              </b-card-text>
              <b-card-text
                v-if="listItem.mode === 'sensor'"
                class="font-weight-bold mb-0"
              >
                <strong> {{ listItem.sensorId.name }} </strong> 센서가 <br>
                최소 <strong> {{ listItem.minValue }} </strong> ~ 최대 <strong> {{ listItem.maxValue }} </strong> 이면
              </b-card-text>
              <b-badge
                variant="light-warning"
                class="badge-round text-center"
                pill
              >
                {{ listItem.command }}
              </b-badge>
            </div>

            <div class="justify-content-between align-items-center">
              <b-badge
                v-for="item in listItem.days"
                :key="item"
                variant="light-dark"
                class="badge-round text-center mr-auto mt-1"
                pill
              >
                {{ getDays(item) }}
              </b-badge>
            </div>

          </b-list-group-item>
        </transition-group>
      </draggable>

    </b-collapse>
  </div>
</template>

<script>
import store from '@/store'
import {
  BCardText, BCollapse, BButton, BListGroupItem, BBadge,
} from 'bootstrap-vue'
import draggable from 'vuedraggable'

export default {
  components: {
    BCardText,
    BCollapse,
    BButton,
    BListGroupItem,
    BBadge,
    draggable,
  },
  props: {
    buttonId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      settingList: [],
      modeColor: 'light-primary',
    }
  },
  created() {
    this.getSettings()
  },
  methods: {
    async getSettings() {
      await store.dispatch('button/fetchSettings', { id: this.buttonId }).then(result => {
        this.settingList = result.data.autoSettings
        console.log(this.settingList)
      })
    },

    getDays(day) {
      if (day === 0) return '월'
      if (day === 1) return '화'
      if (day === 2) return '수'
      if (day === 3) return '목'
      if (day === 4) return '금'
      if (day === 5) return '토'
      if (day === 6) return '일'
      return ''
    },

    getMode(mode) {
      if (mode === 'time') {
        return '시간'
      } if (mode === 'periodic') {
        return '주기'
      } if (mode === 'sensor') {
        return '센서'
      }
      return ''
    },

    getTime(time) {
      console.log(Date(time))
      const splited = time.split(':')
      console.log(splited)
      return `${splited[0]}시 ${splited[1]}분`
    },

    getPeriodic(time) {
      if (time / 1440 > 1) {
        return `${time / 1440}일`
      }
      if (time / 60 > 1) {
        return `${time / 60}시간`
      }
      return `${time}분`
    },

    getSensor(sensor) {
      return `${sensor}가`
    },

    toggleSettingList() {
      this.$refs.autoSettings.show = !this.$refs.autoSettings.show
    },
  },
}
</script>

<style>
.list-group-item {
  transition: all 0.5s
}
</style>
