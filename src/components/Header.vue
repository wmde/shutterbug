<template>
    <header class="header">
        <div class="header--main">
            <div class="logo">
                <icon class="logo--icon"></icon> Shutterbug
            </div>
            <zoom></zoom>
        </div>
        <div class="header--sub">
            <a href="#" class="sidebar-button">
                <Icon class="sidebar-button--icon"></Icon>
            </a>
            <XAxis></XAxis>
        </div>
    </header>
</template>

<script>
	import Zoom from "@/components/Zoom";
	import XAxis from "@/components/XAxis";
	import Icon from "@/components/Icon";
	export default {
		name: "Header",
		components: { Icon, XAxis, Zoom }
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

        &--main, &--sub {
            height: $axis-size;
            line-height: $axis-size;
        }

        &--main {
            background: $header-background;
        }

        &--sub {
            background: $axis-background-color;
            position: relative;
        }
    }

    .logo {
        font-weight: bold;
        color: $font-color-light;
        font-size: 20px;

        &--icon {
            width: 40px;
            height: 40px;
        }
    }

    .sidebar-button {
        position: absolute;
        top: 0;
        left: 0;
        height: $axis-size;
        width: $axis-size;
        background: $sidebar-button-background;

        &--icon {
            height: 40px;
            width: 40px;
        }
    }
</style>