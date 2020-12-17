<template>
  <div class="ml-auto md:block hidden w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
    <v-select v-model="selected" :options="options" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
  </div>
</template>

<script>
  import vSelect from 'vue-select'

  export default {
    data() {
      return {
        options: [{
            id: 1,
            label: 'farm 1'
          },
          {
            id: 2,
            label: 'farm 2'
          },
          {
            id: 3,
            label: 'farm 3'
          }
        ],
        selected: {
          id: 1,
          label: 'farm 1'
        }
      }
    },
    components: {
      'v-select': vSelect
    }
  }
</script>
