<template>
    <div class="vx-row">

        <vx-card class="overflow-hidden">
             <!-- Collpase  -->
            <div class="vx-col w-full">
                <vs-collapse :type="collapse_type" accordion>
                    <vs-collapse-item icon-pack="feather" icon-arrow="icon-arrow-down">
                        <div slot="header">
                            Collapse item
                        </div>
                        <!-- Drag & Drop -->
                        <vs-list>
                            <vs-list-header icon-pack="feather" icon="icon-shield" title="People Group" color="warning"></vs-list-header>
                            <draggable :list="list" class="cursor-move">
                                <transition-group>
                                    <vs-list-item 
                                        class="list-item" 
                                        v-for="listItem in list" 
                                        :key="listItem.email" 
                                        :title="listItem.name" 
                                        :subtitle="listItem.email">
                                    <vs-avatar slot="avatar" 
                                        :text="listItem.name" />
                                    </vs-list-item>
                                </transition-group>
                            </draggable>
                        </vs-list>
                    </vs-collapse-item>

                    <vs-collapse-item icon-pack="feather" icon-arrow="icon-chevrons-down">
                        <div slot="header">
                            Collapse item2
                        </div>
                        Nunc....maximus.
                    </vs-collapse-item>

                    <vs-collapse-item icon-pack="feather" icon-arrow="icon-chevrons-down">
                        <div slot="header">
                            Collapse item3
                        </div>
                        Suspendisse....eu
                    </vs-collapse-item>

                    <vs-collapse-item icon-pack="feather" icon-arrow="icon-chevrons-down">
                        <div slot="header">
                            Collapse item4
                        </div>
                        Suspendisse....finibus.
                    </vs-collapse-item>
                </vs-collapse>
            </div>
        </vx-card>

        
    </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data() {
    return {
        collapse_type: 'border',
        list: [{
            name: "Paz Joya",
            email: "girliness@spotlike.co.uk",
            },
            {
            name: "Sunshine Cose",
            email: "executrixship@equisized.edu",
            },
            {
            name: "Alba Dobbin",
            email: "bidding@demibob.or",
            },
            {
            name: "Marlin Hinchee",
            email: "preholding@scuffly.co.uk",
            },
            {
            name: "Leia Atienza",
            email: "unmeasurableness@interlamellar.co.uk"
            },
            {
            name: "Lashawna Vaudrainm",
            email: "soaking@khubber.com"
            },
            {
            name: "Liliana Henscheid",
            email: "lecideine@turndown.org"
            },
            {
            name: "Keven Kolter",
            email: "nontenure@anglicanum.co.uk"
            }
        ],
    }
  },
  components: {
    draggable
  }
}
</script>

<style>
.list-item { transition: all .5s }

.vs-collapse-item--header {
  font-size: 1.2rem;
  padding: 1rem;
  /* background-color: rgba(var(--vs-primary), 1) !important; */
  color: rgb(var(--vs-primary));
  font-weight: 600;
}
</style>