<template>
  <div>
    <b-button
      variant="gradient-primary"
      size="sm"
      block
      @click="toggleSettingList"
    >
      자동화 동작 목록
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
        :disabled="!isEditing"
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
                {{ getCommand(listItem.command) }}
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
            <div
              v-if="isEditing === true"
              class="justify-content-between align-items-center"
            >
              <hr>
              <b-button
                variant="outline-danger"
                size="sm"
                block
                @click="remove(listItem._id)"
              >
                삭제
              </b-button>
            </div>

          </b-list-group-item>
        </transition-group>
      </draggable>

      <b-button
        v-if="settingList.length > 0"
        :variant="toggleEditColor"
        size="sm"
        block
        class="mt-1"
        @click="toggleEdit"
      >
        {{ toggleEditText }}
      </b-button>

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
      isEditing: false,
      toggleEditText: '자동화 동작 순서 편집',
      toggleEditColor: 'outline-secondary',
    }
  },
  created() {
    this.initSettings()
  },
  methods: {
    async initSettings() {
      await store.dispatch('button/fetchSettings', { id: this.buttonId }).then(result => {
        this.settingList = result.data.autoSettings
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
      const splited = time.split(':')
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

    getCommand(command) {
      if (command === 'open') {
        return '열기'
      }
      if (command === 'stop') {
        return '중지'
      }
      if (command === 'close') {
        return '닫기'
      }
      return ''
    },

    toggleSettingList() {
      this.$refs.autoSettings.show = !this.$refs.autoSettings.show
    },

    toggleEdit() {
      this.isEditing = !this.isEditing

      if (this.isEditing) {
        this.toggleEditColor = 'outline-warning'
        this.toggleEditText = '수정 완료'
      } else {
        this.toggleEditColor = 'outline-dark'
        this.toggleEditText = '자동화 동작 순서 편집'
      }
    },

    remove(id) {
      this.$bvModal
        .msgBoxConfirm('자동화 설정을 정말 삭제하시겠습니까?', {
          title: '자동화 설정 삭제',
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
            store.dispatch('button/deleteSetting', { buttonId: this.buttonId, settingId: id })
              .then(() => {
                this.initSettings()
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
.list-group-item {
  transition: all 0.5s
}
</style>
