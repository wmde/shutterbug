<template>
    <div class="x-axis-row">
        <button class="sidebar-toggle" v-on:click="$emit('toggle-sidebar')" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
            <Icon icon="settings" class="sidebar-toggle--icon"></Icon>
        </button>
        <XAxis></XAxis>
    </div>
</template>

<script>
	import Icon from "@/components/Icon";
	import XAxis from "@/components/XAxis";

	export default {
		name: "XAxisRow",
		components: { Icon, XAxis },
		props : [ 'sidebarIsVisible' ]
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .x-axis-row {
        position: relative;
    }

    .sidebar-toggle {
        border-collapse: collapse;
        position: fixed;
        display: block;
        top: $header-height;
        left: 0;
        height: $axis-size;
        width: $axis-size;
        background: $sidebar-toggle-background;
        z-index: 99;
        border: 0;
        margin: 0;
        padding: 0;
        cursor: pointer;
        transition: left $transition-ease;

        &.sidebar-is-visible {
            left: $sidebar-width;
        }

        &--icon {
            width: 30px;
            height: 27px;
            margin-top: 3px;
            margin-left: 2px;
        }
    }

</style>