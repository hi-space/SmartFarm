<template>
  <div class="text-center mt-2">
    <b-alert
      variant="primary"
      show
    >
      <div class="alert-heading">
        <h3 class="text-primary"> <strong> 문의사항이 있으면 담당자에게 연락주세요 </strong> </h3>
      </div>
      <div class="alert-body">
        <h4 class="text-primary"> <strong> {{ manager_name }} </strong> {{ manager_phone }} </h4>
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
