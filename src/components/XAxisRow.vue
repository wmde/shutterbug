<template>
    <section class="x-axis-row" v-bind:class="{'sidebar-is-visible' : sidebarIsVisible}">
        <div class="x-axis-column" v-for="header in headers" :key="header" :style="{width: `${100/headers.length}%`}">{{header}}</div>
    </section>
</template>

<script>

	export default {
		name: "XAxisRow",
        props: {
			headers: Array,
            sidebarIsVisible: Boolean
        }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .x-axis-row {
        position: fixed;
        top: $header-height;
        right: 0;
        left: 0;
        background: $axis-background-color;
        height: $axis-size;
        line-height: $axis-size;
        font-weight: normal;
        font-size: 16px;
        padding-left: $axis-size;
        z-index: 99;

        transition: left $transition-ease;

        &.sidebar-is-visible {
            left: $sidebar-width;
        }
    }

    .x-axis-column {
        display: inline-block;
        text-align: center;
    }
</style>