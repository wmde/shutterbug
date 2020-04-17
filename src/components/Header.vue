<template>
    <header class="header">
        <div class="header--main">
            <div class="logo">
                <icon class="logo--icon" icon="camera"></icon> Shutterbug
            </div>
            <zoom></zoom>
        </div>
    </header>
</template>

<script>
	import Zoom from "@/components/Zoom";
	import Icon from "@/components/Icon";
	export default {
		name: "Header",
		components: { Icon, Zoom }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .header {
        position: fixed;
        top: 0;
        width: 100%;
        height: $header-height;
        z-index: 99;

        &--main {
            line-height: $header-height;
            height: $header-height;
            background: $header-background;
        }
    }

    .logo {
        font-weight: bold;
        color: $font-color-light;
        font-size: 20px;

        &--icon {
            display: block;
            float: left;
            width: $header-height;
            height: $header-height;
            margin-right: $stage-gutter/2;
        }
    }
</style>