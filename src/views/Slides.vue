<template>
    <div class="page-slides">
        <SidebarToggle
                v-bind:sidebar-is-visible="sidebarIsVisible"
                v-on:toggle-sidebar="onToggleSidebar"
        ></SidebarToggle>

        <sidebar
                v-bind:sidebar-is-visible="sidebarIsVisible"
                v-bind:dimensions="dimensions"
                v-bind:default-dimension="selectedXDimension"
                v-bind:preferred-order-of-dimensions="preferredOrderOfDimensions"
                v-on:select-axes="onSelectAxes"
                v-on:select-campaign="$emit('select-campaign', $event)"
        ></sidebar>

        <stage
                v-bind:sidebar-is-visible="sidebarIsVisible"
                v-bind:grid="grid"
                v-bind:column-headers="columnHeaders"
                v-bind:selected-y-sort-order="selectedYSortOrder"
                v-bind:campaign="campaign"
                v-on:open-slideshow="onOpenSlideshow"
        ></stage>

        <slideshow
                v-bind:grid="grid"
                v-bind:slideshow-is-visible="slideshowIsVisible"
                v-bind:slideshow-position="slideshowPosition"
                v-bind:dimensions="dimensions"
                v-bind:campaign="campaign"
                v-on:close-slideshow="onCloseSlideshow"
                v-on:navigate-by="onNavigateBy"

        ></slideshow>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, onUnmounted, reactive, ref, toRefs, watchEffect } from '@vue/composition-api';
    import Sidebar from '@/components/Sidebar.vue';
    import Stage from "@/components/Stage.vue";
    import SidebarToggle from "@/components/SidebarToggle.vue";
    import Slideshow from "@/components/Slideshow.vue";

    import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";
    import {BANNER, DEVICE, PLATFORM, ORIENTATION, RESOLUTION} from "@/model/Dimensions";
    import {createGrid} from "@/model/createGrid";
    import SlideshowPosition from "@/model/slideshowPosition";
    import {createDimensionCombinations} from "@/model/createDimensionCombinations";
	import {parseMetadata} from "@/model/parseMetadata";

    interface MetadataState {
        isLoading: boolean;
        metaData: ScreenshotMetaData | null;
        selectedXDimension: string;
        selectedYSortOrder: string[];
    }

    export default defineComponent( {
        name: 'Slides',
        components: {
            Slideshow,
            SidebarToggle,
            Stage,
            Sidebar
        },
        props: {
          campaign: String
        },
        setup( props ) {

            // TODO Talk to others to come up with the best order
            // TODO switch BROWSER and BANNER when we have A/B test cases in the example/live data
            const preferredOrderOfDimensions = [ BANNER, DEVICE, RESOLUTION, PLATFORM, ORIENTATION ];
            const metaDataInit: MetadataState = {
                isLoading: true,
                metaData: null,
                selectedXDimension: '',
                selectedYSortOrder: []

            };
            const metaDataState = reactive( metaDataInit );
            watchEffect(() => {
                fetch( `screenshots/${ props.campaign }/metadata.json` )
                .then( response => response.text() )
                .then( metaDataStr =>  {
                    const metadata = ScreenshotMetaData.fromObject( parseMetadata( metaDataStr ) );
                    const hasDimension = ( dimension: string ) => metadata.dimensions.has( dimension );
                    // select default X dimension in order of preference
                    const selectedXDimension = preferredOrderOfDimensions.find( hasDimension ) || '';
                    const orderedYDimensions = preferredOrderOfDimensions.filter( dimension => hasDimension( dimension ) && dimension !== selectedXDimension );
                    metaDataState.metaData = metadata;
                    metaDataState.selectedXDimension = selectedXDimension;
                    metaDataState.selectedYSortOrder = createDimensionCombinations( orderedYDimensions )[0];
                    metaDataState.isLoading = false;
                })
                .catch( e => {
                    console.log("there was an error", e)
                } )
            });
            const yAxisDimensions = computed<Map<string,string[]>>( (): Map<string,string[]> => {
                if( metaDataState.metaData === null) {
                    return new Map<string, string[]>();
                }
                return metaDataState.metaData.getDimensionSubset( metaDataState.metaData.getRemainingDimensions( [ metaDataState.selectedXDimension ] ) );
            } );

            const grid = computed(() => {
                if( metaDataState.metaData === null) {
                    return [];
                }
                return createGrid( metaDataState.metaData.testCases, (yAxisDimensions.value as Map<string,string[]>), metaDataState.selectedYSortOrder );
            });

            const columnHeaders = computed<string[]>( (): string[] => {
                if( metaDataState.metaData === null) {
                    return [];
                }
                return metaDataState.metaData.dimensions.get( metaDataState.selectedXDimension ) || [];
            } );

            // ----------
            // Sidebar state
            // ---------

            const sidebarIsVisible = ref(false);
            const onToggleSidebar = function () {
                sidebarIsVisible.value = !sidebarIsVisible.value;
            };

            const dimensions = computed<Map<string, string[]>>( () => {
                if( metaDataState.metaData === null) {
                    return new Map();
                }
                return metaDataState.metaData.dimensions;
            });

            const onSelectAxes = function ( axes: { xAxis: string; yAxis: string[] } ) {
                metaDataState.selectedXDimension = axes.xAxis;
                metaDataState.selectedYSortOrder = axes.yAxis;
            };

            // --------------------------
            // Slideshow
            // --------------------------

            const slideshowIsVisible = ref(false);
            const slideshowPosition = reactive( { rowIndex: 0, columnIndex: 0} );
            const onNavigateBy = function( deltaX: number, deltaY: number ) {
                const gridY = grid.value.length;
                const gridX = grid.value[ 0 ].length;

                if( deltaX === -1 && slideshowPosition.columnIndex === 0 ) {
                    return;
                }

                if( deltaX === 1 && slideshowPosition.columnIndex === gridX - 1 ) {
                    return;
                }

                if( deltaY === -1 && slideshowPosition.rowIndex === 0 ) {
                    return;
                }

                if( deltaY === 1 && slideshowPosition.rowIndex === gridY - 1 ) {
                    return;
                }

                slideshowPosition.rowIndex += deltaY;
                slideshowPosition.columnIndex += deltaX;
            };
            const onOpenSlideshow = function ( atPosition: SlideshowPosition ) {
                slideshowIsVisible.value = true;
                slideshowPosition.columnIndex = atPosition.columnIndex;
                slideshowPosition.rowIndex = atPosition.rowIndex;
            };
            const onCloseSlideshow = function () {
                slideshowIsVisible.value = false;
            };

            const keyListener = ( e: KeyboardEvent ) => {
                if(!slideshowIsVisible.value) {
                    return;
                }

                switch( e.key ) {
                    case 'Escape':
                        onCloseSlideshow();
                        break;
                    case 'w':
                    case 'ArrowUp':
                        onNavigateBy( 0, -1 );
                        break;

                    case 'a':
                    case 'ArrowLeft':
                        onNavigateBy( -1, 0 );
                        break;

                    case 's':
                    case 'ArrowDown':
                        onNavigateBy( 0, 1 );
                        break;

                    case 'd':
                    case 'ArrowRight':
                        onNavigateBy( 1, 0 );
                        break;
                }
            }

            window.addEventListener('keyup', keyListener);

            onUnmounted(() => {
                window.removeEventListener('keyup', keyListener);
            });

            return {
                dimensions,
                sidebarIsVisible,
                onToggleSidebar,
                slideshowIsVisible,
                slideshowPosition,
                onOpenSlideshow,
                onCloseSlideshow,
                onSelectAxes,
                onNavigateBy,
                grid,
                columnHeaders,
                ...toRefs( metaDataState ),
                preferredOrderOfDimensions: ref( preferredOrderOfDimensions )
            }
        },
    } );
</script>
