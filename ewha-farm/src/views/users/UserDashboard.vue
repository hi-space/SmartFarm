<template>
  <div>
    <b-card>
      <v-select
        id="farm"
        v-model="selectedFarm"
        class="per-page-selector d-inline-block mx-100 w-100"
        :options="farmOptions"
        placeholder="농장을 선택해주세요"
        :searchable="false"
        :clearable="false"
      />
    </b-card>
    <sensor-monitor
      ref="sensorMonitor"
    />
    <network-state-table
      ref="networkTable"
    />
  </div>
</template>

<script>
import {
  BCard,
} from 'bootstrap-vue'
import store from '@/store'
import { getUserData } from '@/auth/utils'
import vSelect from 'vue-select'
import SensorMonitor from './monitoring/SensorMonitor.vue'
import NetworkStateTable from './monitoring/NetworkStateTable.vue'

export default {
  components: {
    SensorMonitor,
    NetworkStateTable,
    vSelect,
    BCard,
  },
  data() {
    return {
      selectedFarm: '',
      farmOptions: [],
    }
  },
  watch: {
    selectedFarm(newVal) {
      const farmId = newVal.value
      this.$refs.networkTable.getNetworkData(farmId)
      this.$refs.sensorMonitor.getSensor(farmId)
      console.log(farmId)
    },
  },
  created() {
    this.getFarmOptions()
  },
  methods: {
    async getFarmOptions() {
      const { id } = getUserData()
      await store.dispatch('users/fetchUser', { id })
      await store.dispatch('farm/fetchFarms', { userId: id })
      this.farmOptions = await store.getters['farm/getFarmSelect']
      if (this.farmOptions.length > 0) {
        // eslint-disable-next-line prefer-destructuring
        this.selectedFarm = this.farmOptions[0]
      }
    },
  },
}
</script>
