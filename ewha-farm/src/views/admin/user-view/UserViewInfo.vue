<template>
    <div id="user-edit-tab-info">
        <!-- Content Row -->

        <div class="vx-row">
            <div class="vx-col md:w-1/2 w-full">

                <vs-input 
                    class="w-full mt-4" 
                    label="이름" 
                    v-model="data_local.name" 
                    v-validate="'required|alpha_num'"
                    name="name" />

                <span class="text-danger text-sm" 
                    v-show="errors.has('name')">
                        {{ errors.first('name') }}
                </span>

                <vs-input 
                    class="w-full mt-4" 
                    label="핸드폰번호" 
                    v-model="data_local.mobile" 
                    type="mobile_phone"
                    v-validate="'required|numeric'" 
                    name="email" />

                <span class="text-danger text-sm"
                    v-show="errors.has('mobile_phone')">
                        {{ errors.first('mobile_phone') }}
                </span>

                <div class="mt-4">
                    <label class="vs-input--label">계정 상태</label>
                    <v-select v-model="status_local" :clearable="false" :options="statusOptions" v-validate="'required'"
                        name="status" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    <span class="text-danger text-sm" v-show="errors.has('status')">{{ errors.first('status') }}</span>
                </div>
            </div>

            <div class="vx-col md:w-1/2 w-full">

                <vs-input class="w-full mt-4" disabled label="아이디" v-model="data_local.username"
                    v-validate="'required|alpha_num'" name="username" />
                <span class="text-danger text-sm" v-show="errors.has('username')">{{ errors.first('username') }}</span>

                <vs-input class="w-full mt-4" label="농장 주소" v-model="data_local.country"
                    v-validate="'required|alpha_spaces'" name="country" />
                <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>

                <div class="mt-4">
                    <label class="vs-input--label">권한</label>
                    <v-select v-model="role_local" :clearable="false" :options="roleOptions" v-validate="'required'"
                        name="role" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                    <span class="text-danger text-sm" v-show="errors.has('role')">{{ errors.first('role') }}</span>
                </div>
            </div>

            <div class="vx-col w-full mt-6">
                <vs-textarea label="메모" v-model="data_local.memo" />
            </div>
        </div>
        <!-- Save & Reset Button -->
        <div class="vx-row">
            <div class="vx-col w-full">
                <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="save_changes" :disabled="!validateForm">Save Changes
                    </vs-button>
                    <vs-button class="ml-4 mt-2" type="border" color="warning" @click="reset_data">Reset</vs-button>
                    <vs-button class="ml-4 mt-2" type="border" color="danger" icon-pack="feather" icon="icon-trash"
                        @click="confirmDeleteRecord">Delete</vs-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import vSelect from 'vue-select'

    export default {
        components: {
            vSelect
        },
        props: {
            data: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                data_local: JSON.parse(JSON.stringify(this.data)),

                statusOptions: [{
                        label: 'Active',
                        value: 'active'
                    },
                    {
                        label: 'Blocked',
                        value: 'blocked'
                    },
                    {
                        label: 'Deactivated',
                        value: 'deactivated'
                    }
                ],
                roleOptions: [{
                        label: 'Admin',
                        value: 'admin'
                    },
                    {
                        label: 'User',
                        value: 'user'
                    },
                    {
                        label: 'Staff',
                        value: 'staff'
                    }
                ]
            }
        },
        computed: {
            status_local: {
                get() {
                    return {
                        label: this.capitalize(this.data_local.status),
                        value: this.data_local.status
                    }
                },
                set(obj) {
                    this.data_local.status = obj.value
                }
            },
            role_local: {
                get() {
                    return {
                        label: this.capitalize(this.data_local.role),
                        value: this.data_local.role
                    }
                },
                set(obj) {
                    this.data_local.role = obj.value
                }
            },
            validateForm() {
                return !this.errors.any()
            }
        },
        methods: {
            capitalize(str) {
                return str.slice(0, 1).toUpperCase() + str.slice(1, str.length)
            },
            save_changes() {
                /* eslint-disable */
                if (!this.validateForm) return

                // Here will go your API call for updating data
                // You can get data in "this.data_local"

                /* eslint-enable */
            },
            reset_data() {
                this.data_local = JSON.parse(JSON.stringify(this.data))
            },
            confirmDeleteRecord() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Confirm Delete',
                    text: `You are about to delete "${this.data_local.name}"`,
                    accept: this.deleteRecord,
                    acceptText: 'Delete'
                })
            },
            update_avatar() {
                // You can update avatar Here
                // For reference you can check dataList example
                // We haven't integrated it here, because data isn't saved in DB
            }
        }
    }
</script>