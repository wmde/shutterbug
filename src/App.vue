<template>
    <div id="app">
        <Header></Header>
        <SidebarToggle v-bind:sidebar-is-visible="sidebarIsVisible" v-on:toggle-sidebar="onToggleSidebar"></SidebarToggle>
        <sidebar v-bind:sidebar-is-visible="sidebarIsVisible"></sidebar>
        <stage v-bind:sidebar-is-visible="sidebarIsVisible"></stage>
    </div>
</template>

<script lang="ts">
	import Header from '@/components/Header.vue';
	import Sidebar from '@/components/Sidebar.vue';
	import Stage from "@/components/Stage.vue";

    import {defineComponent, ref} from '@vue/composition-api';

    import MetaData from './../../banner-screenshots/banner-shots/00-ba-200416/metadata.json';
	import SidebarToggle from "@/components/SidebarToggle.vue";

	export default defineComponent( {
		name: 'App',
		components: {
			SidebarToggle,
			Stage,
			Header,
			Sidebar
		},
        setup() {
			const metaData = MetaData;
            const sidebarIsVisible = ref(false);
            const onToggleSidebar = function () {
                sidebarIsVisible.value = !sidebarIsVisible.value;
            };
            return {
				metaData,
                sidebarIsVisible,
                onToggleSidebar
            }
        },
	} );
</script>

<style lang="scss">
    @import 'src/assets/reset';
    @import 'src/assets/global';

    #app {

    }
</style>
