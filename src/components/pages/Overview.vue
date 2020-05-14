<template>
    <div class="page-overview">
        <h1>Campaign overview</h1>
        <div v-if="lastError" class="error">
            <h2 class="error__title">Error</h2>
            <div class="error__message">There was an error loading the overview.</div>
        </div>
        <ol v-if="!isLoading" class="folders">
            <li v-for="folder in folders"
                :key="folder.campaign"
                class="folders__item folder"
            >
                <a class="folder__title"
                   @click.prevent="$emit( 'select-campaign', folder.campaign )"
                   href="#"
                >{{ folder.campaign }}</a>
                <span class="folder__info" >( {{ folder.testCaseCount }} tests )</span>
            </li>
        </ol>
        <div v-else-if="!lastError">Loading overview ...</div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs, watchEffect} from "@vue/composition-api";

    export default defineComponent( {
        name: "Overview",
        setup() {
            const overviewStateInit = {
                isLoading: true,
                lastError: '',
                folders: []
            }

            const overviewState = reactive( overviewStateInit );
            watchEffect( () => {
                fetch( 'screenshots/metadata_summary.json' )
                .then( response => response.json() )
                .then( campaigns => {
                    overviewState.isLoading = false;
                    overviewState.folders = campaigns ;
                } )
                .catch( e => {
                    console.log('Error loading overview:', e);
                    overviewState.lastError = e;
                } )
            } );

            return {
                ...toRefs( overviewState )
            }
        }
    } );
</script>

<style lang="scss">
    @import "src/assets/settings";

    .page-overview {
        margin-top: $header-height;
        padding: $header-height;
    }

    .folders {
        margin: 0;
    }

    .folder {
        list-style: none;
        margin: 0;
        padding: .25em 0;

        &__title {
            text-decoration: none;
            color: $font-color-dark;
            font-size: 125%;
        }

        &__title:hover {
            text-decoration: underline;
        }

        &__info {
            padding-left: 10px;
        }
    }


</style>
