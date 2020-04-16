<template>
    <div class="x-axis">
        <div>CRTL</div>
        <div>VAR</div>
    </div>
</template>

<script>
	export default {
		name: "XAxis"
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .x-axis {
        height: $axis-size;

        > div {
            display: inline-block;
            width: 50%;
            text-align: center;
        }
    }
</style>