<template>
    <div class="stage" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
        <div class="stage--content">
            <x-axis-row v-bind:sidebar-is-visible="sidebarIsVisible" v-on:toggle-sidebar="$emit('toggle-sidebar')"></x-axis-row>
            <title-row></title-row>
            <row></row>
            <row></row>
            <row></row>
            <title-row></title-row>
            <row></row>
            <row></row>
            <row></row>
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

        &--content {
            margin-top: $header-height;
        }

        &.sidebar-is-visible {
            margin-left: $sidebar-width;
        }
    }
</style>