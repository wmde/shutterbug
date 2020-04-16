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
        padding-bottom: 60px;

        &--label {
            position: absolute;
            width: 60px;
            height: 100%;
            background: $axis-background-color;
            color: $axis-color;

            &-text {
                position: absolute;
                text-align: center;
                display: block;

                transform: rotate(-90deg);
            }

        }

        &--columns {
            >div {
                display: inline-block;
                width: 50%;
            }
        }
    }
</style>