<template>
    <div id="stage">
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
	export default {
		name: "Stage",
		components: { Row, TitleRow }
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    #stage {
        margin-top: $header-height;
    }
</style>