<template>
    <div id="app">
        <Header></Header>

        <SidebarToggle
                v-bind:sidebar-is-visible="sidebarIsVisible"
                v-on:toggle-sidebar="onToggleSidebar"
        ></SidebarToggle>

        <sidebar
                v-bind:sidebar-is-visible="sidebarIsVisible"
                v-bind:dimensions="dimensions"
                v-bind:metadata="metaData"
                v-on:select-axes="onSelectAxes"
        ></sidebar>

        <stage
                v-bind:sidebar-is-visible="sidebarIsVisible"
                v-bind:grid="grid"
                v-bind:row-headers="rowHeaders"
                v-bind:column-headers="columnHeaders"
        ></stage>

    </div>
</template>

<script lang="ts">
	import Header from '@/components/Header.vue';
	import Sidebar from '@/components/Sidebar.vue';
	import Stage from "@/components/Stage.vue";
    import {computed, defineComponent, reactive, ref, toRefs, watchEffect} from '@vue/composition-api';
    import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";
    import {BANNER, BROWSER, OPERATING_SYSTEM, RESOLUTION} from "@/model/Dimensions";
	import SidebarToggle from "@/components/SidebarToggle.vue";
    import {createGrid} from "@/model/createGrid";
    import {createRowHeaders} from "@/model/createRowHeaders";
    import {RowHeader} from "@/model/RowHeader";

    interface MetadataState {
        isLoading: boolean;
        metaData: ScreenshotMetaData | null;
        selectedXDimension: string;
        selectedYSortOrder: string[];
    }

    export default defineComponent( {
		name: 'App',
		components: {
			SidebarToggle,
			Stage,
			Header,
			Sidebar
		},
        setup() {
            const sidebarIsVisible = ref(false);
            const onToggleSidebar = function () {
                sidebarIsVisible.value = !sidebarIsVisible.value;
            };

            const metaDataInit: MetadataState = {
                isLoading: true,
                metaData: null,
                selectedXDimension: BROWSER,
                selectedYSortOrder: []

            };
            const metaDataState = reactive( metaDataInit );
            watchEffect(() => {
                fetch( 'screenshots/metadata.json' )
                .then( response => response.json() )
                .then( metaDataObj =>  {
                    const metadata = ScreenshotMetaData.fromObject( metaDataObj );
                    metaDataState.metaData = metadata;
                    metaDataState.selectedYSortOrder = metadata.getRemainingDimensions( [metaDataState.selectedXDimension ] );
                    metaDataState.isLoading = false;
                })
                .catch( e => {
                    console.log("there was an error", e)
                } )
            });
            const grid = computed(() => {
                if( metaDataState.metaData === null) {
                    return [];
                }

                const selectedRows = metaDataState.metaData.getDimensionSubset( metaDataState.metaData.getRemainingDimensions( [ metaDataState.selectedXDimension ] ) );

                return createGrid( metaDataState.metaData.testCases, selectedRows, metaDataState.selectedYSortOrder );
            });
            const rowHeaders = computed<RowHeader[][]>((): RowHeader[][] => {
                if( metaDataState.metaData === null) {
                    return [];
                }
                return createRowHeaders(metaDataState.metaData.getDimensionSubset( metaDataState.metaData.getRemainingDimensions( [ metaDataState.selectedXDimension ] ) ) );
            } );

            const columnHeaders = computed<string[]>( (): string[] => {
                if( metaDataState.metaData === null) {
                    return [];
                }
                return metaDataState.metaData.dimensions.get( metaDataState.selectedXDimension ) || [];
            } );
            const dimensions = computed( () => {
				if( metaDataState.metaData === null) {
					return new Map();
				}
				return metaDataState.metaData.dimensions;
            });

			const onSelectAxes = function ( axes: { xAxis: string; yAxis: string[] } ) {
				metaDataState.selectedXDimension = axes.xAxis;
				metaDataState.selectedYSortOrder = axes.yAxis;
			}

            return {
				dimensions,
                sidebarIsVisible,
                onToggleSidebar,
				onSelectAxes,
                grid,
                rowHeaders,
                columnHeaders,
                ...toRefs( metaDataState )
            }
        },
	} );
</script>

<style lang="scss">
    @import 'src/assets/reset';
    @import 'src/assets/global';

    #app {

    }
</style>
