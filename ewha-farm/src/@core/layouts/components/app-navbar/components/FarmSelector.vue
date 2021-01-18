<template no-body>
  <!-- <v-select
    id="farm"
    v-model="selectedFarm"
    :options="farmOptions"
  /> -->
  <b-dropdown
    text="else here"
    split-variant="outline-primary"
    variant="primary"
    menu-class="w-100"
    block
  >
    <b-dropdown-item>
      Action
    </b-dropdown-item>
    <b-dropdown-item>
      Another action
    </b-dropdown-item>
    <b-dropdown-item>
      Something else here
    </b-dropdown-item>
  </b-dropdown>
</template>

<script>
// import vSelect from 'vue-select'
import {
  BDropdown, BDropdownItem,
} from 'bootstrap-vue'

export default {
  components: {
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      selectedFarm: '',
      farmOptions: ['제 1농장', '제 2농장'],
    }
  },
}
</script>
