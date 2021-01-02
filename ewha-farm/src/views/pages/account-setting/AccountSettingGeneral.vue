<template>
  <b-card>

    <!-- form -->
    <b-form class="mt-2">
      <b-row>
        <b-col sm="6">
          <b-form-group
            label="E-mail"
            label-for="account-e-mail"
          >
            <b-form-input
              v-model="optionsLocal.email"
              name="email"
              placeholder="Email"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="이름"
            label-for="account-name"
          >
            <b-form-input
              v-model="optionsLocal.fullName"
              name="name"
              placeholder="Name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="전화번호"
            label-for="account-mobile"
          >
            <b-form-input
              v-model="optionsLocal.phone"
              name="company"
              placeholder="Company name"
            />
          </b-form-group>
        </b-col>
        <b-col sm="6">
          <b-form-group
            label="농장 주소"
            label-for="account-company"
          >
            <b-form-input
              v-model="optionsLocal.company"
              name="company"
              placeholder="Company name"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-2 mr-1"
          >
            정보 수정
          </b-button>
          <b-button
            v-ripple.400="'rgba(186, 191, 199, 0.15)'"
            variant="outline-secondary"
            type="reset"
            class="mt-2"
            @click.prevent="resetForm"
          >
            초기화
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: JSON.parse(JSON.stringify(this.generalData)),
      profileFile: null,
    }
  },
  methods: {
    resetForm() {
      this.optionsLocal = JSON.parse(JSON.stringify(this.generalData))
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, previewEl)

    return {
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>
