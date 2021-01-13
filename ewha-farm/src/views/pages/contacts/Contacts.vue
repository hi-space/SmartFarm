<template>
  <div class="demo-spacing-0">
    <b-alert
      variant="primary"
      show
    >
      <h4 class="alert-heading">
        <span><strong> 문의사항이 있으면 담당자에게 연락주세요 </strong></span>
      </h4>
      <div class="alert-body">
        <span> {{ manager_name }} - {{ manager_phone }} </span>
      </div>
    </b-alert>
  </div>
</template>

<script>
import { BAlert } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BAlert,
  },
  data() {
    return {
      manager_name: '김땡땡',
      manager_phone: '010-1234-5678',
    }
  },
}
</script>
