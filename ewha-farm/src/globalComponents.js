import Vue from 'vue'
import VxTooltip from './views/layouts/vx-tooltip/VxTooltip.vue'
import VxCard  from './views/components/vx-card/VxCard.vue'
import VxList  from './views/components/vx-list/VxList.vue'
import VxBreadcrumb  from './views/layouts/VxBreadcrumb.vue'
import FeatherIcon  from './views/components/FeatherIcon.vue'
import VxInputGroup  from './views/components/vx-input-group/VxInputGroup.vue'

Vue.component(VxTooltip.name, VxTooltip)
Vue.component(VxCard.name, VxCard)
Vue.component(VxList.name, VxList)
Vue.component(VxBreadcrumb.name, VxBreadcrumb)
Vue.component(FeatherIcon.name, FeatherIcon)
Vue.component(VxInputGroup.name, VxInputGroup)


// v-select component
import vSelect from 'vue-select'

// Set the components prop default to return our fresh components
vSelect.props.components.default = () => ({
  Deselect: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'XIcon',
        svgClasses: 'w-4 h-4 mt-1'
      }
    })
  },
  OpenIndicator: {
    render: createElement => createElement('feather-icon', {
      props: {
        icon: 'ChevronDownIcon',
        svgClasses: 'w-5 h-5'
      }
    })
  }
})

Vue.component(vSelect)