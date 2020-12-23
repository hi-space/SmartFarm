<template>
    <div class="vx-row">
        <div class="vx-col w-full mb-base">
            <vx-card title="릴레이 등록">
                <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                        <span>DDNS</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                        <vs-input disabled class="w-full" v-model="ddns" />
                    </div>
                </div>
                <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                        <span>Port</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full">
                        <vs-input disabled class="w-full" v-model="port_number" />
                    </div>
                </div>
                <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full">
                        <span>Relay 타입</span>
                    </div>
                    <div class="vx-col sm:w-2/3 w-full" >
                        <v-select label="relay_type" :options="relay_type"/>
                    </div>
                </div>
                <div class="vx-row mb-6">
                    <div class="vx-col sm:w-1/3 w-full"/>
                    <div class="vx-col sm:w-2/3 w-full btn-group">
                        <vs-button type="border" size="small">OPEN</vs-button>
                        <vs-button type="border" size="small">STOP</vs-button>
                        <vs-button type="border" size="small">CLOSE</vs-button>
                    </div>
                </div>

                <div class="vx-row">
                    <div class="vx-col sm:w-2/3 w-full ml-auto">
                        <vs-button color="warning" type="border" class="mb-2"
                            @click="reset()">Reset</vs-button>
                        <vs-button class="mr-3 mb-2 float-right">Submit</vs-button>
                    </div>
                </div>
            </vx-card>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select'

    export default {
        data() {
            return {
                relay_type:[
                    {
                        "type": "1",
                        "relay_type": "ET0808"
                    },
                    {
                        "type": "1",
                        "relay_type": "KC868"
                    }
                ],
                ddns: 'e-form.iptime.org',
                port_number: '10000',
            }
        },
        components: {
            'v-select': vSelect,
        }
    }
</script>
