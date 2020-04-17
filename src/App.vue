<template>
    <div id="app">
        <Header></Header>
        <SidebarToggle v-bind:sidebar-is-visible="sidebarIsVisible"
                       v-on:toggle-sidebar="onToggleSidebar"></SidebarToggle>
        <sidebar v-bind:sidebar-is-visible="sidebarIsVisible"></sidebar>
        <stage v-bind:sidebar-is-visible="sidebarIsVisible" v-bind:grid="grid"></stage>
    </div>
</template>

<script lang="ts">
	import Header from '@/components/Header.vue';
	import Sidebar from '@/components/Sidebar.vue';
	import Stage from "@/components/Stage.vue";
	import { computed, defineComponent, reactive, ref, toRefs, watchEffect } from '@vue/composition-api';
	import { ScreenshotMetaData } from "@/model/ScreenshotMetaData";
	import { BROWSER } from "@/model/Dimensions";

	interface MetadataState {
		isLoading: boolean;
		metaData: ScreenshotMetaData | null;
		selectedDimensions: string[];
	}

	import SidebarToggle from "@/components/SidebarToggle.vue";
	import { createGrid } from "@/model/createGrid";

	export default defineComponent( {
		name: 'App',
		components: {
			SidebarToggle,
			Stage,
			Header,
			Sidebar
		},
		setup() {
			const sidebarIsVisible = ref( false );
			const onToggleSidebar = function () {
				sidebarIsVisible.value = !sidebarIsVisible.value;
			};


			const metaDataInit: MetadataState = {
				isLoading: true,
				metaData: null,
				selectedDimensions: [ BROWSER ]

			};
			const metaDataState = reactive( metaDataInit );
			watchEffect( () => {
				fetch( 'screenshots/metadata.json' )
					.then( response => response.json() )
					.then( metaDataObj => {
						metaDataState.metaData = ScreenshotMetaData.fromObject( metaDataObj );
						metaDataState.isLoading = false;
					} )
					.catch( e => {
						console.log( "there was an error", e )
					} )
			} );
			const grid = computed( () => {
				if( metaDataState.metaData === null ) {
					return [];
				}
				const selectedRows = metaDataState.metaData.getDimensionSubset( metaDataState.selectedDimensions );

				// TODO expose UI for ordering or selection, for now we just take them as-is
				const orderRows = metaDataState.metaData.getRemainingDimensions( metaDataState.selectedDimensions );

				return {
					ylabels: Array.from(selectedRows.values())[0],
					rows: createGrid( metaDataState.metaData.testCases, selectedRows, orderRows )
				}
			} );
			// TODO create computed property of row header labels, based on metaDataState.selectedDimensions and length of dimensions values
			return {
				sidebarIsVisible,
				onToggleSidebar,
				grid,
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
