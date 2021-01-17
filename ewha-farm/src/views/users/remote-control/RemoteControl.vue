<template>
  <div>
    {{ result }}
  </div>
</template>

<script>
import { ref } from '@vue/composition-api'
import axiosIns from '@/libs/axios'

export default {
  setup() {
    const result = ref(null)

    axiosIns.get('/dummy/sensor/123').then(res => {
      console.log(res.data)
      result.value = res.data
    }).catch(err => {
      console.log(err)
    })

    return {
      result,
    }
  },
}
</script>

<style>

</style>
