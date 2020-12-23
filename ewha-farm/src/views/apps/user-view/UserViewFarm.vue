<template>
    <ag-grid-vue ref="agGridTable" 
        style="height: 320px;"
        :gridOptions="gridOptions" 
        class="ag-theme-material w-100 my-4 ag-grid-table"
        @grid-ready="onGridReady" 
        :columnDefs="columnDefs" 
        :defaultColDef="defaultColDef" 
        :rowData="rowData"
            rowSelection="single" 
            colResizeDefault="shift" 
            :animateRows="true" 
            :pagination="true"
            :enterMovesDown="true"
            :enterMovesDownAfterEdit="true"
            :suppressPaginationPanel="true">
    </ag-grid-vue>
</template>

<script>
    import farm from '@/data/user-list.json'

    import { AgGridVue } from 'ag-grid-vue'
    import CellRendererActions from '@/views/components/cell-renderer/CellRendererActions.vue'

    import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

    export default {
        components: {
            AgGridVue,
            CellRendererActions
        },
        data: function () {
            return {
                gridOptions: {},
                columnDefs: [
                    {
                        headerName: '축사 ID',
                        field: 'age',
                    },
                    {
                        headerName: '축사 이름',
                        field: 'athlete',
                    },
                    {
                        headerName: 'Actions',
                        cellRendererFramework: 'CellRendererActions'
                    }
                ],
                defaultColDef: {
                    flex: 1,
                    sortable: true,
                    filter: true,
                    editable: true,
                },

                gridApi: null,
                columnApi: null,
                rowData: null,
            };
        },
        mounted() {
            this.gridApi = this.gridOptions.api;
            this.gridColumnApi = this.gridOptions.columnApi;

        },
        methods: {
            onGridReady(params) {
                const httpRequest = new XMLHttpRequest();
                const updateData = (data) => {
                    this.rowData = data;
                };

                httpRequest.open(
                    'GET',
                    'https://raw.githubusercontent.com/ag-grid/ag-grid/master/grid-packages/ag-grid-docs/src/olympicWinners.json'
                );
                httpRequest.send();
                httpRequest.onreadystatechange = () => {
                    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
                        updateData(JSON.parse(httpRequest.responseText));
                    }
                };
            },
        },
    }
</script>