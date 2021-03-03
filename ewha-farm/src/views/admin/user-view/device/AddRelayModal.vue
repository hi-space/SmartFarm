<template>
  <!-- Modal -->
  <b-modal
    ref="addRelayModal"
    title="릴레이 등록"
    ok-title="등록"
    cancel-title="취소"
    cancel-variant="outline-secondary"
    no-close-on-backdrop
    centered
    @ok="update()"
  >
    <b-form>
      <b-row>
        <b-col cols="6">
          <div class="divider my-1">
            <div class="divider-text text-primary">
              OUT_PIN
            </div>
          </div>
        </b-col>
        <b-col cols="6">
          <div class="divider my-1">
            <div class="divider-text text-primary font-weight-bold">
              IN_PIN
            </div>
          </div>
        </b-col>
      </b-row>

      <b-row
        v-for="item of 8"
        :key="item"
      >
        <b-col cols="6">
          <b-form-group
            :label="item.toString()"
            :label-for="`out-${item}`"
            label-cols-sm="1"
            label-align-sm="right"
          >
            <v-select
              :id="`out-${item}`"
              ref="outPins"
              v-model="outPins[item]"
              :options="buttonList"
              :clearable="true"
              :searchable="false"
              :disabled="outDisabled[item]"
              class="select-size-sm"
            />
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            :label="item.toString()"
            label-for="`in-${item}`"
            label-cols-sm="1"
            label-align-sm="right"
          >
            <v-select
              :id="`in-${item}`"
              v-model="inPins[item]"
              :options="buttonList"
              :clearable="true"
              :searchable="false"
              :disabled="inDisabled[item]"
              class="select-size-sm"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-form>
  </b-modal>
</template>

<script>
/* eslint-disable no-plusplus */
import {
  BModal, VBModal, BForm, BFormGroup, BRow, BCol,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BModal,
    BForm,
    BFormGroup,
    BRow,
    BCol,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
  },
  data() {
    return {
      deviceId: null,
      buttonList: [],
      outPins: [],
      outDisabled: Array.from({ length: 9 }, () => false),
      outIndex: Array.from({ length: 9 }, () => 0),
      inPins: [],
      inDisabled: Array.from({ length: 9 }, () => false),
      inIndex: Array.from({ length: 9 }, () => 0),
    }
  },
  watch: {
    outPins(items) {
      this.outDisabled = Array.from({ length: 9 }, () => false)
      this.outIndex = Array.from({ length: 9 }, () => 0)

      for (let idx = 1; idx <= 8; idx++) {
        try {
          this.outIndex[idx] = items[idx].relayCnt > 0 ? 1 : 0
          for (let tmp = 1; tmp < items[idx].relayCnt; tmp++) {
            this.outDisabled[idx + tmp] = true
            this.outIndex[idx + tmp] = tmp + 1
            this.outPins[idx + tmp] = null
          }
        // eslint-disable-next-line no-empty
        } catch {}
      }
    },

    inPins(items) {
      this.inDisabled = Array.from({ length: 9 }, () => false)
      this.inIndex = Array.from({ length: 9 }, () => 0)

      for (let idx = 1; idx <= 8; idx++) {
        try {
          this.inIndex[idx] = items[idx].relayCnt > 0 ? 1 : 0
          for (let tmp = 1; tmp < items[idx].relayCnt; tmp++) {
            this.inDisabled[idx + tmp] = true
            this.inIndex[idx + tmp] = tmp + 1
            this.inPins[idx + tmp] = null
          }
        // eslint-disable-next-line no-empty
        } catch {}
      }
    },
  },
  methods: {
    async show(item) {
      this.deviceId = item._id
      this.buttonList = await this.$store.getters['button/getAllButtonForRelay'](item.farmId._id)

      this.outPins = []
      this.outIndex = Array.from({ length: 9 }, () => 0)
      this.inPins = []
      this.inIndex = Array.from({ length: 9 }, () => 0)

      this.outPins.push(null)
      this.outIndex.push(null)
      this.inPins.push(null)
      this.inIndex.push(null)

      for (let i = 0; i < item.relays.outPin.length; i++) {
        this.outPins.push(this.$store.getters['button/getButtonForRelay'](item.relays.outPin[i].button))
        this.outIndex.push(item.relays.outPin[i].buttonIdx)

        this.inPins.push(this.$store.getters['button/getButtonForRelay'](item.relays.inPin[i].button))
        this.inIndex.push(item.relays.inPin[i].buttonIdx)
      }

      this.$refs.addRelayModal.show()
    },

    makeOutPin(no) {
      let button = null
      if (this.outIndex[no] === 1) {
        button = this.outPins[no].value
      } else if (this.outIndex[no] > 1) {
        button = this.outPins[no - this.outIndex[no] + 1].value
      }

      return {
        no,
        button,
        buttonIdx: this.outIndex[no],
      }
    },

    makeInPin(no) {
      let button = null
      if (this.inIndex[no] === 1) {
        button = this.inPins[no].value
      } else if (this.inIndex[no] > 1) {
        button = this.inPins[no - this.inIndex[no] + 1].value
      }

      return {
        no,
        button,
        index: this.inIndex[no],
      }
    },

    update() {
      const outPin = []
      const inPin = []
      for (let i = 1; i <= 8; i++) {
        outPin.push(this.makeOutPin(i))
        inPin.push(this.makeInPin(i))
      }

      const body = {
        outPin,
        inPin,
      }

      console.log(body)

      this.$store.dispatch('device/setRelay', { id: this.deviceId, queryBody: body })
        .then(() => {
          this.$emit('update')
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
