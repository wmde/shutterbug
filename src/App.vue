<template>
    <div id="app">
        <Header></Header>

        <main>
            <component
                    v-bind:is="currentPage"
                    :campaign="currentCampaign"
                    @select-campaign="setCampaign"
            />
        </main>
    </div>
</template>

<script lang="ts">
    import { computed, defineComponent, ref } from '@vue/composition-api';
    import Header from '@/components/Header.vue';
    import Overview from "@/components/pages/Overview.vue";
    import Slides from "@/components/pages/Slides.vue";

    export default defineComponent( {
        name: 'App',
        components: {
            Header,
            Overview,
            Slides,
        },
        setup() {
            const currentCampaign = ref('' );
            const setCampaign = ( campaign: string ) => currentCampaign.value = campaign

            const currentPage = computed( () => currentCampaign.value ? 'Slides' : 'Overview' );

            return {
                currentCampaign,
                currentPage,
                setCampaign,
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
