<template>
    <vx-card title="함체 등록">
        
        <device-register-popup></device-register-popup>

        <vs-divider color="danger">Popup</vs-divider>

        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>농장주</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <v-select label="username" :options="username" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>위치</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full  mb-2">
                <v-select label="farm_location" :options="farm_location" />
            </div>
            <div class="vx-col sm:w-2/3 w-full ml-auto">
                <vs-input v-model="farm_location_detail" class="w-full"></vs-input>
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>함체 이름</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <vs-input class="w-full" v-model="device_name" />
            </div>
        </div>

        <vs-divider color="primary">Network Setting</vs-divider>

        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>DDNS</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <vs-input class="w-full" v-model="ddns" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>Port</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <vs-input class="w-full" v-model="port_number" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>ID</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <vs-input class="w-full" v-model="network_id" />
            </div>
        </div>
        <div class="vx-row mb-6">
            <div class="vx-col sm:w-1/3 w-full">
                <span>Password</span>
            </div>
            <div class="vx-col sm:w-2/3 w-full">
                <vs-input type="password" class="w-full" v-model="network_password" />
            </div>
        </div>
        <div class="vx-row">
            <div class="vx-col sm:w-2/3 w-full ml-auto">
                <vs-button color="warning" type="border" class="mb-2" @click="reset">Reset</vs-button>
                <vs-button class="mr-3 mb-2 float-right">Submit</vs-button>
            </div>
        </div>
    </vx-card>
</template>

<script>
    import vSelect from 'vue-select'
import CCTVRegisterPopup from '../popup-register/CCTVRegisterPopup.vue';
import DeviceRegisterPopup from '../popup-register/DeviceRegisterPopup.vue';

    export default {
        data() {
            return {
                popupActive: false,
                username: [{
                        countryCode: 'DE',
                        username: '이동엽'
                    },
                    {
                        countryCode: 'AUS',
                        username: '홍길동'
                    },
                    {
                        countryCode: 'CA',
                        username: '이상엽'
                    }
                ],
                farm_location: [{
                        countryCode: 'DE',
                        farm_location: '제 1축사'
                    },
                    {
                        countryCode: 'AUS',
                        farm_location: '제 2축사'
                    },
                    {
                        countryCode: 'CA',
                        farm_location: '제 3축사'
                    }
                ],
                farm_location_detail: '',
                device_name: '',
                ddns: '',
                port_number: '',
                network_id: '',
                network_password: '',
                validName: false,
            }
        },
        components: {
            'v-select': vSelect,
            DeviceRegisterPopup,
                CCTVRegisterPopup,
        },
        methods: {
            reset() {
                this.farm_location_detail = '';
                this.device_name = '';
                this.ddns = '';
                this.port_number = '';
                this.network_id = '';
                this.network_password = '';
            },
            acceptAlert () {
                this.$vs.notify({
                    color:'success',
                    title:'Accept Selected',
                    text:'Lorem ipsum dolor sit amet, consectetur'
                })
            },
            close () {
                this.$vs.notify({
                    color:'danger',
                    title:'Closed',
                    text:'You close a dialog!'
                })
            },
            clearValMultiple() {

            }
        }
    }
</script>
