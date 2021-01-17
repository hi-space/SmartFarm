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
            <div class="d-flex">
              <b-card-text class="font-weight-bold mb-0">
                {{ listItem.name }}
              </b-card-text>
            </div>
          </b-list-group-item>
        </transition-group>
      </draggable>

    </b-collapse>
  </div>
</template>

<script>
import {
  BCardText, BCollapse, BButton, BListGroupItem,
} from 'bootstrap-vue'
import draggable from 'vuedraggable'

export default {
  components: {
    BCardText,
    BCollapse,
    BButton,
    BListGroupItem,
    draggable,
  },
  data() {
    return {
      settingList: [
        {
          name: 'hello',
          email: 'girliness@spotlike.co.uk',
        },
        {
          name: 'hi',
          email: 'girliness@spotlike.co.uk',
        },
        {
          name: 'yo',
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
