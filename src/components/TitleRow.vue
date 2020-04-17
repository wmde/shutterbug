<template>
    <tr class="title-row">
        <td class="title-row--label">
            <div class="title-row--icon">
                <Icon :icon="header.label"></Icon>
            </div>
        </td>
        <td :colspan="columns">
            <div class="title-row--column-label">
                {{ header.label}}
            </div>
        </td>
    </tr>
</template>

<script>
	import Icon from "@/components/Icon";
	import {RowHeader} from "@/model/RowHeader";
	export default {
		name: "TitleRow",
		components: { Icon },
        props: {
			header: RowHeader,
            columns: Number
        }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .title-row {
        border-top: 1px solid $border-color;

        &--label {
            width: $axis-size;
            background: $axis-background-color;
            color: $axis-color;
        }

        &--column-label {
            line-height: 70px;
            font-weight: bold;
            font-size: 12px;
            padding-left: $stage-gutter / 2;
        }

        &--icon {
            position: relative;
            line-height: 70px;
            .icon {
                position: absolute;
                display: block;
                height: 20px;
                width: 20px;
                top: 50%;
                left: 50%;
                margin-top: -14px;
                margin-left: -10px;
            }
        }
    }
</style>