<template>
    <div class="stage" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
        <div class="stage--content">
            <XAxisRow :headers="columnHeaders" :sidebar-is-visible="sidebarIsVisible"></XAxisRow>
            <ValueRow v-for="( testcases, index) in grid"
                 :testcases="testcases"
                 :key="index"
                 :rowIndex="index"
                 :selected-y-sort-order="selectedYSortOrder"
                 :campaign="campaign"
                 v-on:open-slideshow="( slideshowPosition ) => $emit( 'open-slideshow', slideshowPosition )"
            />
        </div>
    </div>
</template>

<script>
	import XAxisRow from "@/components/XAxisRow";
	import ValueRow from "@/components/ValueRow";

	export default {
		name: "Stage",
		components: { XAxisRow, ValueRow },
		props : {
            campaign: String,
			sidebarIsVisible: Boolean,
			grid: Array,
            columnHeaders: Array,
			selectedYSortOrder: Array,
		}
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .stage {
        position: fixed;
        overflow: auto;
        right: 0;
        left: 0;
        height: 100%;

        transition: margin-left $transition-ease;

        &.sidebar-is-visible {
            margin-left: $sidebar-width;
        }

        &--content {
            margin-top: $header-height + $axis-size;
        }
    }
</style>
