<template>
    <div id="page-user-view">

        <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
            <span>User record with id: {{ $route.params.userId }} not found. </span>
            <span>
                <span>Check </span>
                <router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>
            </span>
        </vs-alert>

        <div id="user-data" v-if="user_data">
            <vx-card title="Account" class="mb-base">
                <div class="vx-row">
                    <!-- Information - Col 1 -->
                    <div class="vx-col flex-1" id="account-info-col-1">
                        <table>
                            <tr>
                                <td class="font-semibold">이름</td>
                                <td>{{ user_data.name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">핸드폰번호</td>
                                <td>{{ user_data.mobile }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">계정 상태</td>
                                <td>{{ user_data.status }}</td>
                            </tr>
                        </table>
                    </div>
                    <!-- /Information - Col 1 -->

                    <!-- Information - Col 2 -->
                    <div class="vx-col flex-1" id="account-info-col-2">
                        <table>
                            <tr>
                                <td class="font-semibold">아이디</td>
                                <td>{{ user_data.username }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">농장 주소</td>
                                <td>{{ user_data.name }}</td>
                            </tr>
                            <tr>
                                <td class="font-semibold">권한</td>
                                <td>{{ user_data.role }}</td>
                            </tr>
                        </table>
                    </div>

                </div>

                <vx-card class="mt-4" no-shadow card-border>                    
                    <span> {{user_data.memo}} </span>
                </vx-card>

                <div class="vx-row w-full flex ml-auto mt-6" id="account-manage-buttons">
                    <vs-button icon-pack="feather" icon="icon-edit" class="mr-4"
                        :to="{name: 'user-edit', params: { userId: $route.params.userId }}">Edit</vs-button>
                    <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash"
                        @click="confirmDeleteRecord">Delete</vs-button>
                </div>

            </vx-card>

            <div class="vx-row">
                <div class="vx-col lg:w-1/2 w-full">
                    <vx-card title="축사" class="mb-base">
                        <user-view-farm></user-view-farm>
                    </vx-card>
                </div>

                <div class="vx-col lg:w-1/2 w-full">
                    <vx-card title="함체" class="mb-base">
                        <user-view-device></user-view-device>
                    </vx-card>
                </div>
            </div>

            <!-- Permissions -->
            <vx-card>

                <div class="vx-row">
                    <div class="vx-col w-full">
                        <div class="flex items-end px-3">
                            <feather-icon svgClasses="w-6 h-6" icon="LockIcon" class="mr-2" />
                            <span class="font-medium text-lg leading-none">Permissions</span>
                        </div>
                        <vs-divider />
                    </div>
                </div>

                <div class="block overflow-x-auto">
                    <table class="w-full permissions-table">
                        <tr>
                            <th class="font-semibold text-base text-left px-3 py-2"
                                v-for="heading in ['Module', 'Read', 'Write', 'Create', 'Delete']" :key="heading">
                                {{ heading }}</th>
                        </tr>

                        <tr v-for="(val, name) in user_data.permissions" :key="name">
                            <td class="px-3 py-2">{{ name }}</td>
                            <td v-for="(permission, name) in val" class="px-3 py-2" :key="name+permission">
                                <vs-checkbox v-model="val[name]" class="pointer-events-none" />
                            </td>
                        </tr>
                    </table>
                </div>

            </vx-card>
        </div>
    </div>
</template>

<script>
    import moduleUserManagement from '@/store/user-management/moduleUserManagement.js'
    import UserViewFarm from './UserViewFarm.vue'
    import UserViewDevice from './UserViewDevice.vue'
    import user_data from '@/data/user.json'

    export default {
        data() {
            return {
                user_data: user_data,
                user_not_found: false
            }
        },
        components: {
            UserViewFarm,
            UserViewDevice,
        },
        computed: {
            userAddress() {
                let str = ''
                for (const field in this.user_data.location) {
                    str += `${field  } `
                }
                return str
            }
        },
        methods: {
            confirmDeleteRecord() {
                this.$vs.dialog({
                    type: 'confirm',
                    color: 'danger',
                    title: 'Confirm Delete',
                    text: `You are about to delete "${this.user_data.username}"`,
                    accept: this.deleteRecord,
                    acceptText: 'Delete'
                })
            },
            deleteRecord() {
                this.$router.push({
                    name: 'app-user-list'
                })
                this.showDeleteSuccess()
            },
            showDeleteSuccess() {
                this.$vs.notify({
                    color: 'success',
                    title: 'User Deleted',
                    text: 'The selected user was successfully deleted'
                })
            }
        },
    }
</script>

<style lang="scss">
    #avatar-col {
        width: 10rem;
    }

    #page-user-view {
        table {
            td {
                vertical-align: top;
                min-width: 140px;
                padding-bottom: .8rem;
                word-break: break-all;
            }

            &:not(.permissions-table) {
                td {
                    @media screen and (max-width:370px) {
                        display: block;
                    }
                }
            }
        }
    }

    // #account-info-col-1 {
    //   // flex-grow: 1;
    //   width: 30rem !important;
    //   @media screen and (min-width:1200px) {
    //     & {
    //       flex-grow: unset !important;
    //     }
    //   }
    // }


    @media screen and (min-width:1201px) and (max-width:1211px),
    only screen and (min-width:636px) and (max-width:991px) {
        #account-info-col-1 {
            width: calc(100% - 12rem) !important;
        }

        // #account-manage-buttons {
        //   width: 12rem !important;
        //   flex-direction: column;

        //   > button {
        //     margin-right: 0 !important;
        //     margin-bottom: 1rem;
        //   }
        // }

    }
</style>
