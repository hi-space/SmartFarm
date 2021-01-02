<template>
    <vx-card title="버튼 등록">

        <button-register-popup></button-register-popup>

        <vs-divider color="danger">Popup</vs-divider>

        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>버튼</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <v-select label="button_type" :options="button_type" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>버튼 타입</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <v-select label="button_type_detail" :options="button_type_detail" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>Relay 사용 개수</span>
            </div>
            <div class="vx-col">
                <vs-input-number v-model="relay_count" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>신호 타입</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <v-select label="signal_type" :options="signal_type" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>동작 시간</span>
            </div>
            <div class="vx-col">
                <vs-input-number v-model="operating_time" :step="5" />
            </div>
            <div class="vx-col sm:w-1/3 w-full">
                <v-select label="operating_time_unit" :options="operating_time_unit" />
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col sm:w-2/3 w-full ml-auto">
                <vs-button class="mr-3 mb-2 float-right">Submit</vs-button>
            </div>
        </div>
    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
import ButtonRegisterPopup from '../popup-register/ButtonRegisterPopup.vue'

    export default {
        data() {
            return {
                popupActive: false,
                button_type: [{
                    type: 'DE',
                    button_type: '커튼'
                }, ],
                button_type_detail: [{
                        type: 'DE',
                        button_type_detail: 'CURTAIN 1'
                    },
                    {
                        type: 'AUS',
                        button_type_detail: 'CURTAIN 2'
                    },
                    {
                        type: 'CA',
                        button_type_detail: 'CURTAIN 3'
                    }
                ],
                signal_type: [{
                    type: 'DE',
                    signal_type: 'Toggle'
                }, ],
                operating_time_unit: [{
                        type: 'sec',
                        operating_time_unit: '초'
                    },
                    {
                        type: 'min',
                        operating_time_unit: '분'
                    },
                    {
                        type: 'min',
                        operating_time_unit: '시간'
                    },
                    {
                        type: 'min',
                        operating_time_unit: '일'
                    },
                    {
                        type: 'min',
                        operating_time_unit: '주'
                    },
                    {
                        type: 'min',
                        operating_time_unit: '달'
                    },
                ],
                relay_count: 1,
                operating_time: 5,
                validName: false,
            }
        },
        components: {
            'v-select': vSelect,
            ButtonRegisterPopup,
        },
        methods: {
            acceptAlert () {

            },
            close () {

            },
            clearValMultiple() {

            }
        }
    }
</script>
