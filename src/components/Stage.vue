<template>
    <div class="stage" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
        <div class="stage--content">
            <table class="stage--table">
                <thead>
                    <XAxisRow v-bind:labels="grid.labels"></XAxisRow>
                </thead>
                <tbody>
                    <row v-for="( testcases, index ) in grid.rows" :testcases="testcases" :grid="grid" :label="grid.ylabels[index]" :colNumber="index" :key="index"></row>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
	import Row from "@/components/Row";
	import XAxisRow from "@/components/XAxisRow";

	export default {
		name: "Stage",
		components: { XAxisRow, Row },
		props : [ 'sidebarIsVisible', 'grid' ]
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .stage {
        position: fixed;
        overflow: auto;
        width: 100%;
        height: 100%;

        transition: margin-left $transition-ease;

        &.sidebar-is-visible {
            margin-left: $sidebar-width;
        }

        &--content {
            margin-top: $header-height;
        }

        &--table {
            border-collapse: collapse;
            table-layout: fixed;

            caption, tbody, tfoot, thead, tr, th, td {
                margin: 0;
                outline: 0;
            }
        }
    }
</style>