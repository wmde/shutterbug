<template>
    <div class="title-row">
        <div class="title-row--label">
            <img class="title-row--icon" src="https://www.placecage.com/g/20/20" alt="Temp">
        </div>
        <div class="title-row--column-label">
            <div>
                Internet Explorer
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: "TitleRow"
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .row + .title-row {
        margin-top: -60px;
    }

    .title-row {
        position: relative;
        height: 140px;
        line-height: 140px;

        &--label {
            position: absolute;
            width: 60px;
            height: 100%;
            background: $axis-background-color;
            color: $axis-color;
        }

        &--icon {
            height: 20px;
            width: 20px;
        }
    }
</style>