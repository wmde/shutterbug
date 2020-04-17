<template>
    <div id="app">
        <Header></Header>
        <sidebar v-bind:sidebar-is-visible="sidebarIsVisible"></sidebar>
        <stage v-bind:sidebar-is-visible="sidebarIsVisible" v-on:toggle-sidebar="onToggleSidebar"></stage>
    </div>
</template>

<script lang="ts">
	import Header from '@/components/Header.vue';
	import Sidebar from '@/components/Sidebar.vue';
	import Stage from "@/components/Stage.vue";
    import {defineComponent, ref} from '@vue/composition-api';

	export default defineComponent( {
		name: 'App',
		components: {
			Stage,
			Header,
			Sidebar
		},
        setup() {
            const sidebarIsVisible = ref(false);
            const onToggleSidebar = function () {
                sidebarIsVisible.value = !sidebarIsVisible.value;
            };
            return {
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
