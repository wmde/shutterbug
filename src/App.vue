<template>
    <div id="app">
        <Header></Header>

        <main>
            <router-view />
        </main>
    </div>
</template>

<script lang="ts">
    import { defineComponent } from '@vue/composition-api';
    import Header from '@/components/Header.vue';

    export default defineComponent( {
        name: 'App',
        components: {
            Header,
        }
    } );
</script>

<style lang="scss">
    @import 'src/assets/reset';
    @import 'src/assets/global';

    #app {

    }
</style>
