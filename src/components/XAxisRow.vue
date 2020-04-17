<template>
    <tr class="x-axis-row">
        <th></th>
        <th>CTRL</th>
        <th>VAR</th>
    </tr>
</template>

<script>

	export default {
		name: "XAxisRow"
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .x-axis-row {
        background: $axis-background-color;
        height: $axis-size;
        line-height: $axis-size - 3px;
        th {
            font-weight: normal;
            font-size: 16px;
        }
    }
</style>