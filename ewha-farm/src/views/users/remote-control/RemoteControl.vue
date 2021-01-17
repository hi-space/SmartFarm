<template>
  <b-card-actions
    :title="title"
    action-collapse
  >
    <b-row>

      <!-- range -->
      <b-col md="6">
        <b-form-group>
          <h5>Range</h5>
          <feather-icon
            icon="CalendarIcon"
            size="16"
          />
          <flat-pickr
            v-model="rangeDate"
            class="form-control"
            :config="{ mode: 'range'}"
          />
        </b-form-group>
      </b-col>

    </b-row>
  </b-card-actions>
</template>

<script>
import {
  BRow,
  BCol,
  BFormGroup,
} from 'bootstrap-vue'
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import flatPickr from 'vue-flatpickr-component'

export default {
  components: {
    BRow,
    BCardActions,
    BCol,

    flatPickr,
    BFormGroup,
  },
  data() {
    return {
      date: null,
      dateDefault: null,
      timePicker: null,
      dateNtim: null,
      multiDate: null,
      rangeDate: null,
      humanDate: null,
      disableDate: null,
      inlineDate: null,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
