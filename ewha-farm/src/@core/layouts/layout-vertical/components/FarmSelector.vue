<template no-body>
  <v-select
    id="farm"
    v-model="selectedFarm"
    class="per-page-selector d-inline-block mx-100 w-100"
    :options="farmOptions"
    placeholder="농장을 선택해주세요"
  />
</template>

<script>
import store from '@/store'
// import { ref } from '@vue/composition-api'
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selectedFarm: '',
      farmOptions: ['제 1농장', '제 2농장'],
    }
  },
  async setup(props) {
    // const farmOptions = store.getters['farm/getFarmSelect']

    const result = await store.dispatch('farm/fetchFarms', { userId: props.id })
    console.log(result)
    const farmOptions = store.getters['farm/getFarmSelect']

    return {
      farmOptions,
    }
  },
}
</script>
