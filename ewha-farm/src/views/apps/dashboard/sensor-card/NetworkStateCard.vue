<template>
    <vx-card title="네트워크 현황" class="overflow-hidden" refresh-content-action>
        
        <vs-table :data="users" max-items="5" pagination>

            <template slot="thead">
                <vs-th sort-key="id">축사</vs-th>
                <vs-th sort-key="email">Email</vs-th>
                <vs-th sort-key="name">Name</vs-th>
                <vs-th sort-key="website">Website</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :state="indextr == 1 ? 'success' : indextr == 4 ? 'danger':null" :key="indextr" v-for="(tr, indextr) in data">
                    <vs-td :data="data[indextr].id">
                        {{data[indextr].id}}
                    </vs-td>
                    <vs-td :data="data[indextr].email">
                        {{data[indextr].email}}
                    </vs-td>
                    <vs-td :data="data[indextr].username">
                        {{data[indextr].name}}
                    </vs-td>
                    <vs-td :data="data[indextr].id">
                        {{data[indextr].website}}
                    </vs-td>
                </vs-tr>
            </template>
        </vs-table>


    </vx-card>
</template>

<script>
import networkStateData from '@/data/networkState.json'

export default {
    components: {
    },
    data () {
        return {
            users: networkStateData,
        }
    }
}
</script>
