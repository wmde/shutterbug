<template>
    <div class="stage" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
        <div class="stage--content">
            <table class="stage--table">
                <thead>
                    <XAxisRow></XAxisRow>
                </thead>
                <tbody>
                    <title-row></title-row>
                    <row></row>
                    <row></row>
                    <row></row>
                    <title-row></title-row>
                    <row></row>
                    <row></row>
                    <row></row>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
	import TitleRow from "@/components/TitleRow";
	import Row from "@/components/Row";
	import XAxisRow from "@/components/XAxisRow";

	export default {
		name: "Stage",
		components: { XAxisRow, Row, TitleRow },
		props : [ 'sidebarIsVisible' ]
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
            caption, tbody, tfoot, thead, tr, th, td {
                margin: 0;
                outline: 0;
            }
        }
    }
</style>