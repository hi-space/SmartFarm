<template>
  <b-row>
    <b-col
      v-for="item in buttonItems"
      :key="item._id"
      sm="12"
      md="6"
      lg="4"
    >
      <control-card :item="item" />
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import store from '@/store'
import ControlCard from './components/ControlCard.vue'

export default {
  components: {
    ControlCard,
    BCol,
    BRow,
  },
  data() {
    return {
      buttonItems: [],
    }
  },
  created() {
    this.initData()
  },
  methods: {
    async initData() {
      const result = await store.dispatch('button/fetchButtons',
        { userId: store.state.users.user._id, farmId: store.state.farm.farm._id })
      this.buttonItems = result.data
    },
  },
}
</script>

<style>

</style>
