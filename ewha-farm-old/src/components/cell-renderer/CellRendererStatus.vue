<template>
    <!-- <vs-chip class="ag-grid-cell-chip" :color="chipColor(params.value)">
      <feather-icon icon="Edit3Icon" svgClasses="h-5 w-5 mr-4 hover:text-primary cursor-pointer" @click="editRecord" />
      <span>{{ params.value }}</span>
    </vs-chip> -->
    <vs-button :disabled="clickable(params.value)" :color="chipColor(params.value)" :type="clickableBtn(params.value)" icon-pack="feather" icon="icon-check">{{result(params.value)}}</vs-button>
</template>

<script>
export default {
  name: 'CellRendererStatus',
  data: function() {
    return {
      status: "vv"
    };
  },
  computed: {
    result () {
      return (value) => {
        if (value === 'active') return 'Done'
        else if (value === 'deactivate') return 'danger'
        else if (value === 'request') return 'warning'
        else return 'primary'
      }
    },

    chipColor () {
      return (value) => {
        if (value === 'active') return 'success'
        else if (value === 'deactivate') return 'danger'
        else if (value === 'request') return 'warning'
        else return 'primary'
      }
    },

    clickable () {
      return (value) => {
        if (value === 'active') return true
        else return false
      }
    },

    clickableBtn() {
      return (value) => {
        if (value === 'active') return 'flat'
        else return 'border'
      }
    }
  }
}
</script>

<style lang="scss" scpoped>
.ag-grid-cell-chip {
  &.vs-chip-success {
    background: rgba(var(--vs-success),.15);
    color: rgba(var(--vs-success),1) !important;
    font-weight: 500;
  }
  &.vs-chip-warning {
    background: rgba(var(--vs-warning),.15);
    color: rgba(var(--vs-warning),1) !important;
    font-weight: 500;
  }
  &.vs-chip-danger {
    background: rgba(var(--vs-danger),.15);
    color: rgba(var(--vs-danger),1) !important;
    font-weight: 500;
  }
}
</style>
