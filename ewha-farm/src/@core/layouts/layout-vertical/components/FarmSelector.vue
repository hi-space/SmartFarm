<template no-body>
  <v-select
    id="farm"
    v-model="selectedFarm"
    class="per-page-selector d-inline-block mx-100 w-100"
    :options="farmOptions"
    placeholder="농장을 선택해주세요"
    :searchable="searchable"
    :clearable="clearable"
  />
</template>

<script>
import store from '@/store'
import { getUserData } from '@/auth/utils'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      selectedFarm: '',
      farmOptions: [],
      searchable: false,
      clearable: false,
    }
  },
  watch: {
    selectedFarm(newVal) {
      const farmId = newVal.value
      store.dispatch('farm/fetchFarm', { id: farmId }).then(() => {
        // console.log(store.state.farm.farm)
      })
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
