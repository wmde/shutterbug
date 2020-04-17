<template>
    <div id="stage">
        <x-axis-row></x-axis-row>
        <title-row></title-row>
        <row></row>
        <row></row>
        <row></row>
        <title-row></title-row>
        <row></row>
        <row></row>
        <row></row>
    </div>
</template>

<script>
	import TitleRow from "@/components/TitleRow";
	import Row from "@/components/Row";
	import XAxisRow from "@/components/XAxisRow";
	export default {
		name: "Stage",
		components: { XAxisRow, Row, TitleRow }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    #stage {
        margin-top: $header-height;
    }
</style>