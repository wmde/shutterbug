<template>
    <header class="header">
        <div class="header--main">
			<div class="logo">
				<router-link to="/">
					<icon class="logo--icon" icon="camera"></icon> Shutterbug
				</router-link>
            </div>
        </div>
    </header>
</template>

<script>
	import Icon from "@/components/Icon.vue";
	export default {
		name: "ShutterbugHeader",
		components: { Icon },
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

		a {
			text-decoration: none;
			color: $font-color-light;
		}
    }

    .logo {
        font-weight: bold;
        color: $font-color-light;
        font-size: 20px;

        &--icon {
            display: block;
            float: left;
            width: 30px;
            height: 27px;
            margin-top: 16px;
            margin-left: 15px;
            margin-right: $stage-gutter/2;
        }
    }
</style>
