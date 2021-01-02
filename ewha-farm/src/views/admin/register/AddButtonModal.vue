<template>
  <div>
    <!-- Button -->
    <b-button
      v-b-modal.add-button-modal
      variant="outline-primary"
    >
      버튼 등록
    </b-button>

    <!-- Modal -->
    <b-modal
      id="add-button-modal"
      title="버튼 등록"
      ok-title="submit"
      cancel-variant="outline-secondary"
    >
      <b-form>
        <b-form-group
          label="버튼 타입"
          label-for="button-type"
        >
          <v-select
            id="button-type"
            v-model="buttonSelected"
            :options="buttonOptions"
          />
        </b-form-group>
        <b-form-group
          label="버튼 세부 타입"
          label-for="button-detail"
        >
          <v-select
            id="button-detail"
            v-model="buttonDetailSelected"
            :options="buttonDetailOptions"
          />
        </b-form-group>
        <b-form-group
          label="Relay 사용 개수"
          label-for="relay-num"
        >
          <b-form-spinbutton
            id="relay-num"
            v-model="relayNum"
            min="1"
            max="5"
          />
        </b-form-group>
        <b-form-group
          label="신호 타입"
          label-for="signal-type"
        >
          <v-select
            id="signal-type"
            v-model="signalTypeSelected"
            :options="signalTypeOptions"
          />
        </b-form-group>
        <b-row>
          <b-col md="6">
            <b-form-group
              label="동작 시간"
              label-for="working-time"
            >
              <b-form-spinbutton
                id="working-time"
                v-model="workingTime"
                min="0"
                step="5"
                cols="6"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group
              label="단위"
              label-for="working-time-unit"
            >
              <v-select
                id="working-time-unit"
                v-model="timeUnitSelected"
                :options="timeUnitOptions"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {
  BRow, BCol, BButton, BModal, VBModal, BForm, BFormGroup, BFormSpinbutton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BModal,
    BForm,
    BFormGroup,
    BFormSpinbutton,
    vSelect,
  },
  directives: {
    'b-modal': VBModal,
    Ripple,
  },
  data() {
    return {
      buttonSelected: '커튼',
      buttonOptions: ['커튼'],
      buttonDetailSelected: 'CURTAIN1',
      buttonDetailOptions: ['CURTAIN1', 'CURTAIN2', 'CURTAIN3'],
      signalTypeSelected: 'Toggle',
      signalTypeOptions: ['Toggle'],
      timeUnitSelected: '초',
      timeUnitOptions: ['초', '분', '시간', '일', '주', '달'],
      workingTime: 0,
      relayNum: 1,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
