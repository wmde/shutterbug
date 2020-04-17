<template>
    <tr class="row">
        <td class="row--label">
            <div class="row--label-content">
                <span class="row--label-text">1024</span>
            </div>
        </td>
        <td class="row--screenshot">
            <div class="row--screenshot-content">
                <img src="https://www.placecage.com/g/1280/960" alt="I am an image">
            </div>
        </td>
        <td class="row--screenshot">
            <div class="row--screenshot-content">
                <img src="https://www.placecage.com/g/1280/960" alt="I am an image">
            </div>
        </td>
    </tr>
</template>

<script>
	export default {
		name: "Row"
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .row {
        padding-bottom: $row-padding;

        &--label {
            position: relative;
            background: $axis-background-color;

            &-content {
                position: absolute;
                width: $axis-size;
                height: 100%;
                color: $axis-color;
                padding-bottom: $row-padding;
                top: 0;
            }

            &-text {
                position: absolute;
                top: 50%;
                margin-top: -$axis-size;
                display: block;
                height: $axis-size;
                line-height: $axis-size;
                width: $axis-size;
                text-align: center;
                white-space: nowrap;
                font-size: 16px;

                transform: rotate(-90deg);
            }

        }

        &--screenshot {
            padding-bottom: 60px;

            &:first-of-type {
                padding-left: $stage-gutter/2;
            }

            &:last-of-type {
                padding-right: $stage-gutter/2;
            }

            &-content {
                padding: 0 ($stage-gutter/2);
                display: block;
                width: 100%;
            }
        }
    }
</style>