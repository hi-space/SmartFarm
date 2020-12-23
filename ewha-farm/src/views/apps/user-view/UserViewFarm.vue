<template>
    <ag-grid-vue ref="agGridTable" 
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

    import {
        AgGridVue
    } from 'ag-grid-vue'
    import '@/assets/scss/vuexy/extraComponents/agGridStyleOverride.scss'

    export default {
        components: {
            'ag-grid-vue': AgGridVue,
        },
        data: function () {
            return {
                gridOptions: {},
                columnDefs: [{
                        field: 'athlete',
                        minWidth: 160,
                    },
                    {
                        field: 'age'
                    }
                ],
                defaultColDef: {
                    width: 170,
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