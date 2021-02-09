<template>
  <div class="text-center mt-2">
    <b-alert
      variant="primary"
      show
    >
      <div class="alert-heading">
        <h5 class="text-primary">
          문의사항이 있으면 <br> 담당자에게 연락주세요
        </h5>
      </div>
      <div class="alert-body">
        <h4 class="text-primary">
          <strong> {{ managerName }} </strong> <br> {{ managerPhone }}
        </h4>
      </div>
    </b-alert>
  </div>
</template>

<script>
import { BAlert } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { getUserData } from '@/auth/utils'
import axiosIns from '@/libs/axios'
import { ref } from '@vue/composition-api'

export default {
  directives: {
    Ripple,
  },
  components: {
    BAlert,
  },
  setup() {
    const managerName = ref(null)
    const managerPhone = ref(null)

    axiosIns.get(`users/${getUserData().id}/manager`).then(response => {
      managerName.value = response.data.name
      managerPhone.value = response.data.phone
    })

    return {
      managerName,
      managerPhone,
    }
  },
}
</script>
