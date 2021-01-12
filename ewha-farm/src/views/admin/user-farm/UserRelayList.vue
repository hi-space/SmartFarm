<template>
  <b-card>
    <div>
      <b-form
        ref="form"
        :style="{height: trHeight}"
        class="ralay-form"
        @submit.prevent="repeateAgain"
      >

        <!-- Row Loop -->
        <b-row
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
        >

          <!-- Button type -->
          <b-col md="2">
            <b-form-group
              label="Button Type"
              label-for="button-type"
            >
              <v-select
                :options="buttonType"
                :reduce="val => val.value"
                :clearable="false"
                input-id="button-type"
              />
            </b-form-group>
          </b-col>

          <!-- Item Name -->
          <b-col md="2">
            <b-form-group
              label="Item Name"
              label-for="item-name"
            >
              <b-form-input
                id="item-name"
                type="text"
                placeholder="Vuexy Admin Template"
              />
            </b-form-group>
          </b-col>

          <!-- Cost -->
          <b-col md="2">
            <b-form-group
              label="Cost"
              label-for="cost"
            >
              <b-form-input
                id="cost"
                type="number"
                placeholder="32"
              />
            </b-form-group>
          </b-col>

          <!-- Quantity -->
          <b-col md="2">
            <b-form-group
              label="Quantity"
              label-for="quantity"
            >
              <b-form-input
                id="quantity"
                type="number"
                placeholder="1"
              />
            </b-form-group>
          </b-col>

          <!-- Profession -->
          <b-col
            lg="2"
            md="1"
          >
            <b-form-group
              label="Price"
              label-for="price"
            >
              <b-form-input
                id="pzrice"
                value="32$"
                plaintext
              />
            </b-form-group>
          </b-col>

          <!-- Remove Button -->
          <b-col
            lg="2"
            md="3"
            class="mb-50"
          >
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-danger"
              class="mt-0 mt-md-2"
              pill
              @click="removeItem(index)"
            >
              <feather-icon
                icon="XIcon"
              />
            </b-button>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              variant="outline-success"
              class="mt-0 mt-md-2"
              pill
              @click="removeItem(index)"
            >
              <feather-icon
                icon="CheckIcon"
              />
            </b-button>
          </b-col>
          <b-col cols="12">
            <hr>
          </b-col>
        </b-row>

      </b-form>
    </div>
    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      @click="repeateAgain"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Add New</span>
    </b-button>
  </b-card>
</template>

<script>
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BCard,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/transition'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BForm,
    BRow,
    BCol,
    BCard,
    BButton,
    BFormGroup,
    BFormInput,
    vSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      items: [{
        id: 1,
        selected: 'male',
        selected1: 'designer',
        prevHeight: 0,
      }],
      nextTodoId: 2,
      buttonType: [
        { label: 'Toggle', value: 'toggle' },
        { label: 'Pending', value: 'pending' },
      ],
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
