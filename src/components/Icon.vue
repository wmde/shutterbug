<template>
    <svg class="icon">
        <use v-bind="{ 'xlink:href': '/icons/symbol-defs.svg#icon-' + icon }"></use>
    </svg>
</template>

<script>
	export default {
		name: "Icon",
        props: ["icon"]
	}
</script>

<style lang="scss">
    .icon {
        display: inline-block;
    }
</style>