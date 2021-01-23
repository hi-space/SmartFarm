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
            :key="listItem.name"
            tag="li"
          >
            <div class="d-flex justify-content-between align-items-center">
              <b-card-text class="font-weight-bold mb-0">
                {{ listItem.name }}
              </b-card-text>
              <b-badge
                variant="light-warning"
                class="badge-round text-center"
                pill
              >
                열기
              </b-badge>
            </div>

          </b-list-group-item>
        </transition-group>
      </draggable>

    </b-collapse>
  </div>
</template>

<script>
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
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      settingList: [
        {
          name: '온도센서 24도 이상일 때 닫기',
          email: 'girliness@spotlike.co.uk',
        },
        {
          name: '매 시간마다 열기',
          email: 'girliness@spotlike.co.uk',
        },
        {
          name: '12:00 ~ 15:00 열기',
          email: 'girliness@spotlike.co.uk',
        },
      ],
    }
  },
  methods: {
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
