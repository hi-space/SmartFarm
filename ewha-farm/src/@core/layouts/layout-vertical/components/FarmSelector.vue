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
import vSelect from 'vue-select'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      selectedFarm: '',
      farmOptions: ['제 1농장', '제 2농장'],
    }
  },
  mounted() {
    // this.farmOptions = this.$store.getters['farm/getFarmSelect']
  },
}
</script>
