<template>
    <div id="app">
        <Header></Header>
        <sidebar></sidebar>
        <stage></stage>
    </div>
</template>

<script lang="ts">
	import Vue from 'vue';
	import Header from '@/components/Header.vue';
	import Sidebar from '@/components/Sidebar.vue';
	import Stage from "@/components/Stage.vue";

	export default Vue.extend( {
		name: 'App',
		components: {
			Stage,
			Header,
            Sidebar
		}
	} );
</script>

<style lang="scss">
    @import 'src/assets/reset';
    @import 'src/assets/global';

    #app {

    }
</style>
