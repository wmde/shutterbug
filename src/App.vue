<template>
    <div id="app">
		<AppHeader/>

        <main>
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import AppHeader from '@/components/Header.vue';

    export default defineComponent( {
        name: 'App',
        components: {
            AppHeader,
        }
    } );
</script>
