<template>
  <b-row>
    <b-col
      sm="12"
      md="6"
      lg="4"
    >
      <control-card title="1번 커튼" />
    </b-col>
    <b-col
      sm="12"
      md="6"
      lg="4"
    >
      <control-card title="2번 커튼" />
    </b-col>
    <b-col
      sm="12"
      md="6"
      lg="4"
    >
      <control-card title="3번 커튼" />
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol,
} from 'bootstrap-vue'
import ControlCard from './components/ControlCard.vue'

export default {
  components: {
    ControlCard,
    BCol,
    BRow,
  },
  data() {
    return {

    }
  },
}
</script>

<style>

</style>
