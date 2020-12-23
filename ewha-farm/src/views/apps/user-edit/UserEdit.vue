<template>
    <div id="page-user-edit">
        <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
            <span>User record with id: {{ $route.params.userId }} not found. </span>
            <span>
                <span>Check </span>
                <router-link :to="{name:'page-user-list'}" class="text-inherit underline">All Users</router-link>
            </span>
        </vs-alert>

        <vx-card v-if="user_data">
            <div slot="no-body" class="tabs-container px-6 pt-6">
                <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
                    <vs-tab label="Account" icon-pack="feather" icon="icon-user">
                        <div class="tab-text">
                            <user-edit-account class="mt-4" :data="user_data" />
                        </div>
                    </vs-tab>
                    <vs-tab label="Information" icon-pack="feather" icon="icon-info">
                        <div class="tab-text">
                            <user-edit-tab-information class="mt-4" :data="user_data" />
                        </div>
                    </vs-tab>
                </vs-tabs>

            </div>

        </vx-card>
    </div>
</template>

<script>
    import UserEditAccount from './UserEditAccount.vue'
    import UserEditTabInformation from './UserEditTabInformation.vue'
    import user_data from '@/data/user.json'

    export default {
        components: {
            UserEditAccount,
            UserEditTabInformation
        },
        data() {
            return {
                user_data: user_data,
                user_not_found: false,
                activeTab: 0
            }
        },
        watch: {
            activeTab() {

            }
        },
        methods: {

        },
        created() {

        }
    }
</script>