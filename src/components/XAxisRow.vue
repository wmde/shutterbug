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
    @use "../assets/settings";

    .x-axis-row {
        position: fixed;
        top: settings.$header-height;
        right: 0;
        left: 0;
        background: settings.$axis-background-color;
        height: settings.$axis-size;
        line-height: settings.$axis-size;
        font-weight: normal;
        font-size: 16px;
        padding-left: settings.$axis-size;
        z-index: 99;

        transition: left settings.$transition-ease;

        &.sidebar-is-visible {
            left: settings.$sidebar-width;
        }
    }

    .x-axis-column {
        display: inline-block;
        text-align: center;
    }
</style>
