<template>
    <div class="x-axis-row">
        <a href="#" class="sidebar-button">
            <Icon class="sidebar-button--icon"></Icon>
        </a>
        <XAxis></XAxis>
    </div>
</template>

<script>
	import Icon from "@/components/Icon";
	import XAxis from "@/components/XAxis";

	export default {
		name: "XAxisRow",
		components: { Icon, XAxis }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .x-axis-row {
        position: relative;
    }

    .sidebar-button {
        position: fixed;
        top: $header-height;
        left: 0;
        height: $axis-size;
        width: $axis-size;
        background: $sidebar-button-background;
        z-index: 99;

        &--icon {
            height: 40px;
            width: 40px;
        }
    }

</style>