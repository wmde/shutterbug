<template>
    <div class="page-overview">
        <h1 class="page-overview-heading">Campaign overview</h1>
        <div v-if="lastError" class="error">
            <h2 class="error__title">Error</h2>
            <div class="error__message">There was an error loading the overview.</div>
        </div>
        <ol v-if="!isLoading" class="folders">
            <li v-for="folder in folders"
                :key="folder.campaign"
                class="folders__item folder"
            >
                <router-link
                        class="folder__card"
                        :to="`/slides/${folder.campaign}`">
                    <Icon :icon="'folder'" class="folder__icon"></Icon>
                    {{ folder.campaign }}<br>
                    <i class="folder__info" >( {{ folder.testCaseCount }} tests )</i>
                </router-link>
            </li>
        </ol>
        <div v-else-if="!lastError">Loading overview ...</div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, reactive, toRefs, watchEffect} from "@vue/composition-api";
    import Icon from "@/components/Icon.vue";

    export default defineComponent( {
        name: "Overview",
        components: {
            Icon
        },
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
    @import "../assets/settings";

    .page-overview {
        margin-top: $header-height;
        padding: $header-height;

        &-heading {
            margin-bottom: $header-height;
        }

        .folders {
            margin: 0 (-$stage-gutter / 2);
            display: flex;
            flex-wrap: wrap;
            align-content: stretch;
            height: 100%;

            &__item {
                width: 100%;

                @media (min-width: 950px) {
                    width: 50%;
                }
            }
        }

        .folder {
            list-style: none;
            margin: 0;
            line-height: 1.2;

            &__card {
                position: relative;
                display: block;
                text-decoration: none;
                color: $font-color-dark;
                font-size: 125%;
                margin: 0 ($stage-gutter / 2) 40px;
                padding: 20px 20px 20px 80px;
                border: 1px solid $border-color;

                &:hover, &:focus {
                    border-color: $overview-border-hover;
                }
            }

            &__icon {
                position: absolute;
                top: 50%;
                left: 18px;
                height: 50px;
                width: 50px;
                margin-top: -25px;
            }

            &__title:hover {
                text-decoration: underline;
            }

            &__info {
                color: $font-color-secondary;
                font-size: 14px;
            }
        }
    }

</style>
