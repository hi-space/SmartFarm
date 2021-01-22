<template>
  <div>
    <b-alert
      variant="primary"
      show
    >
      <h2 class="text-primary text-center">
        <feather-icon
          class="mr-25"
          icon="AlertCircleIcon"
        />
        <span v-text="text" />
      </h2>
    </b-alert>
  </div>
</template>

<script>
import store from '@/store'
import { BAlert } from 'bootstrap-vue'
import router from '@/router'

export default {
  components: {
    BAlert,
  },
  data() {
    return {
      manager_name: '관리자',
      manager_phone: '010-1234-5678',
      text: '',
    }
  },
  beforeMount() {
    if (typeof store.state.farm.farm !== 'undefined') {
      router.push({ name: 'dashboard' })
    } else {
      this.text = '농장을 등록해주세요'
    }
  },
}
</script>
