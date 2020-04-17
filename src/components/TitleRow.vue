<template>
    <div class="title-row">
        <div class="title-row--label">
            <icon class="title-row--icon" icon="ie11"></icon>
        </div>
        <div class="title-row--column-label">
            <div>
                Internet Explorer
            </div>
        </div>
    </div>
</template>

<script>
	import Icon from "@/components/Icon";
	export default {
		name: "TitleRow",
		components: { Icon }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .title-row {
        position: relative;
        height: 70px;
        line-height: 70px;
        border-top: 1px solid $border-color;
        padding-left: $axis-size + ($stage-gutter/2);

        &--label {
            position: absolute;
            left: 0;
            width: $axis-size;
            height: 100%;
            background: $axis-background-color;
            color: $axis-color;
        }

        &--column-label {
            font-weight: bold;
            font-size: 12px;
        }

        &--icon {
            height: 20px;
            width: 20px;
            margin: 20px;
        }
    }
</style>