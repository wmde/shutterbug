<template>
    <section class="title-row">
        <div class="title-row--label">
            <Icon class="title-row--icon" :icon="header.label"></Icon>
        </div>
        <div>
            <div class="title-row--column-label">
                {{ header.label}}
            </div>
        </div>
    </section>
</template>

<script>
	import Icon from "@/components/Icon";
	import {RowHeader} from "@/model/RowHeader";
	export default {
		name: "TitleRow",
		components: { Icon },
        props: {
			header: RowHeader
        }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .title-row {
        position: relative;
        border-top: 1px solid $border-color;
        padding-left: $axis-size;

        &--label {
            position: absolute;
            top: 0;
            left: 0;
            width: $axis-size;
            height: $axis-size;
            line-height: $axis-size;
            text-align: center;
            background: $axis-background-color;
            color: $axis-color;
        }

        &--column-label {
            line-height: 60px;
            font-weight: bold;
            font-size: 12px;
            padding-left: $stage-gutter / 2;
        }

        &--icon {
            position: absolute;
            display: block;
            height: 20px;
            width: 20px;
            top: 50%;
            left: 50%;
            margin-top: -10px;
            margin-left: -10px;
        }
    }
</style>