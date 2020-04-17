<template>
    <div class="row">
        <div class="row--label">
            <span class="row--label-text">1024</span>
        </div>
        <div class="row--columns">
            <div>
                <img src="https://www.placecage.com/g/1280/960" alt="I am an image">
            </div>
            <div>
                <img src="https://www.placecage.com/g/1280/960" alt="I am an image">
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "Row"
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .row {
        position: relative;
        padding-bottom: $row-padding;

        &--label {
            position: absolute;
            width: $axis-size;
            height: 100%;
            background: $axis-background-color;
            color: $axis-color;
            padding-bottom: $row-padding;

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

        &--columns {
            padding: 0 $axis-size;

            > div {
                padding: 0 ($stage-gutter/2);
                display: inline-block;
                width: 50%;
            }
        }
    }
</style>