<template>
    <section class="row">

        <div class="row--label">
            <span class="row--label-text">{{ header.label }}</span>
        </div>

        <div class="row--screenshot"
             v-for="(testcase, columnIndex) in testcases"
             v-bind:key="testcase.screenshotFilename"
             :class="{'invalid' : testcase.isValid}"
             :style="{width: `${100/testcases.length}%`}"
        >
            <a href="" class="row--screenshot-content" v-on:click.prevent ="$emit( 'open-slideshow', { rowIndex, columnIndex } )">
                <div v-if="testcase.isValid">
                    <div class="row--screenshot-image" :class="{ 'desktop': testcase.isDesktop() }">
                        <img :src="`screenshots/${campaign}/${testcase.screenshotFilename}`" :alt="testcase.screenshotFilename">
                    </div>
                    <div v-for="dimensionName in additionalHeaderInfo"
                         :key="dimensionName"
                         class="row--screenshot-metadata">
                        {{dimensionName}}: {{testcase.dimensions.get( dimensionName )}}
                    </div>
                </div>
                <div v-else class="row--screenshot-invalid-reason">
                    <div class="row--screenshot-invalid-reason-text">{{testcase.invalidReason}}</div>
                </div>
            </a>
        </div>

    </section>
</template>

<script lang="ts">
	import {RowHeader} from "@/model/RowHeader";
	import {computed, defineComponent} from "@vue/composition-api";

	export default defineComponent( {
		name: "ValueRow",
        props: {
            campaign: String,
			testcases: Array,
			header: RowHeader,
            rowIndex: Number,
            selectedYSortOrder: {
                type: Array,
                default: () => []
            },
		},
        setup( props ) {
            const additionalHeaderInfo = computed( () => {
                return props.selectedYSortOrder.slice( 2 );
            } );
            return {
                additionalHeaderInfo
            }
        }
	} );
</script>

<style lang="scss">
    @import "src/assets/settings";

    .row {
        position: relative;
        display: flex;
        flex-wrap: nowrap;
        padding-bottom: $row-padding;
        padding-left: $axis-size;

        &--label {
            position: absolute;
            top: 0;
            left: 0;
            background: $axis-background-color;
            width: $axis-size;
            height: 100%;
            color: $axis-color;
            padding-bottom: $row-padding;

            &-text {
                position: absolute;
                top: 50%;
                margin-top: -$axis-size;
                display: block;
                height: $axis-size;
                line-height: $axis-size;
                width: $axis-size;
                text-align: center;
                white-space: nowrap;
                font-size: 16px;

                transform: rotate(-90deg);
            }

        }

        &--screenshot {
            position: relative;
            display: flex;

            &:first-of-type {
                padding-left: $stage-gutter/2;
            }

            &:last-of-type {
                padding-right: $stage-gutter/2;
            }

            &-content {
                padding: 0 ($stage-gutter/2);
                display: block;
                width: 100%;
                min-height: 100px;
                color: $font-color-dark;
                text-decoration: none;
                text-align: center;
            }

            &-image.desktop {
                position: relative;
                height: 0;
                padding-bottom: 56.25%; /* 16:9 */
                overflow-y: hidden;

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: auto;
                }
            }

            &-metadata {
                position: absolute;
                bottom: -30px;
                left: 0;
                right: 0;
                height: 30px;
                line-height: 30px;
                font-weight: bold;
                font-size: 12px;
                text-align: center;
            }

            &-invalid-reason {
                position: absolute;
                top: 0;
                height: 100%;
                left: ($stage-gutter/2);
                right: ($stage-gutter/2);
                background: #eee;
                font-size: 12px;

                display: flex;
                align-items: center;
                justify-content: center;

                &-text {
                    padding: 0 30px;
                    text-align: center;
                    color: #aaa;
                }
            }
        }
    }
</style>
