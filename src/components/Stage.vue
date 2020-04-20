<template>
    <div class="stage" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
        <div class="stage--content">
            <XAxisRow :headers="columnHeaders" :sidebar-is-visible="sidebarIsVisible"></XAxisRow>
            <row v-for="( testcases, index) in grid"
                 :testcases="testcases"
                 :key="index"
                 :headers="rowHeaders[index]"
                 :context-info="contextInfo"
            />
        </div>
    </div>
</template>

<script>
	import Row from "@/components/Row.ts";
	import XAxisRow from "@/components/XAxisRow";

	export default {
		name: "Stage",
		components: { XAxisRow, Row },
		props : {
			sidebarIsVisible: Boolean,
			grid: Array,
            rowHeaders: Array,
            columnHeaders: Array,
            contextInfo: Array,
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