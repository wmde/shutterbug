<template>
    <div class="slideshow" :class="{'is-visible' : slideshowIsVisible}">
        <div class="slideshow--sidebar">
            <a href="" class="slideshow--close" v-on:click.prevent="$emit('close-slideshow')">
                <Icon :icon="'close'" class="slideshow--close-icon"></Icon>
            </a>
            <table class="slideshow--testcase-metadata">
                <tr v-for="dimensionName in dimensions.keys()" :key="dimensionName">
                    <td><strong>{{ dimensionName }}:</strong></td>
                    <td>{{ currentTestcase.dimensions.get( dimensionName ) || '' }}</td>
                </tr>
            </table>
            <div class="slideshow--controls">
                <a href="" v-on:click.prevent="$emit('navigate-by', -1, 0)" class="slideshow--controls-left" :class="{ 'active' : canNavigateLeft }">
                    <Icon :icon="'left'" class="slideshow--controls-left-icon"></Icon>
                </a>
                <a href="" v-on:click.prevent="$emit('navigate-by',0, -1)" class="slideshow--controls-up" :class="{ 'active' : canNavigateUp }">
                    <Icon :icon="'up'" class="slideshow--controls-up-icon"></Icon>
                </a>
                <a href="" v-on:click.prevent="$emit('navigate-by', 0, 1)" class="slideshow--controls-down" :class="{ 'active' : canNavigateDown }">
                    <Icon :icon="'down'" class="slideshow--controls-down-icon"></Icon>
                </a>
                <a href="" v-on:click.prevent="$emit('navigate-by', 1, 0)" class="slideshow--controls-right" :class="{ 'active' : canNavigateRight }">
                    <Icon :icon="'right'" class="slideshow--controls-right-icon"></Icon>
                </a>
            </div>
        </div>
        <div class="slideshow--screenshot">
            <img v-if="currentTestcase.isValid" :src="`screenshots/${campaign}/${currentTestcase.screenshotFilename}`" :alt="currentTestcase.screenshotFilename">
            <span v-else>
                {{currentTestcase.invalidReason}}
            </span>
        </div>
    </div>
</template>

<script>
	import { computed } from '@vue/composition-api';
	import Icon from "@/components/Icon";

	import SlideshowPosition from "@/model/slideshowPosition";

	export default {
		name: "Slideshow",
		components: { Icon },
		props: {
            campaign: String,
			slideshowIsVisible: Boolean,
			slideshowPosition: SlideshowPosition,
			grid: Array,
            dimensions: Map,
		},
		setup( props ) {
			const currentTestcase = computed( () => {
				if( props.grid.length === 0 ) {
					return { dimensions: [] };
                }
				return props.grid[ props.slideshowPosition.rowIndex ][ props.slideshowPosition.columnIndex ];
			});

			const canNavigateUp = computed( () => {
				return props.slideshowPosition.rowIndex > 0
            });

			const canNavigateDown = computed( () => {
				if( props.grid.length === 0 ) {
					return false;
				}
				return props.slideshowPosition.rowIndex < props.grid.length - 1
			});

			const canNavigateLeft = computed( () => {
				return props.slideshowPosition.columnIndex > 0
			});

			const canNavigateRight = computed( () => {
				if( props.grid.length === 0 ) {
					return false;
				}
				return props.slideshowPosition.columnIndex < props.grid[0].length - 1
			});

			return {
				currentTestcase,
                canNavigateUp,
                canNavigateDown,
                canNavigateLeft,
                canNavigateRight
			}
		}
	}
</script>

<style lang="scss">
    @import 'src/assets/settings';

    .slideshow {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: $slideshow-background;
        z-index: 100;
        color: $font-color-light;

        visibility: hidden;
        transform: scale(1.2);
        opacity: 0;
        transition: transform $transition-ease, opacity $transition-ease, visibility $transition-ease;

        &.is-visible {
            visibility: visible;
            transform: scale(1);
            opacity: 1;
        }

        &--sidebar {
            position: absolute;
            top: 0;
            left: 0;
            width: $sidebar-width;
            height: 100%;
            background: #000;
            padding: 80px 20px 20px;
        }

        &--screenshot {
            position: absolute;
            top: 0;
            left: $sidebar-width;
            right: 0;
            height: 100%;
            overflow-y: auto;
            padding: 30px;

            img {
                width: auto;
            }
        }

        &--close {
            position: absolute;
            top: 20px;
            left: 20px;
            height: 60px;
            width: 60px;

            &-icon {
                height: 30px;
                width: 30px;
            }
        }

        &--controls {
            position: absolute;
            bottom: 0;
            left: 50%;
            margin-left: -100px;
            height: 200px;
            width: 200px;

            &-up, &-down, &-left, &-right {
                position: absolute;
                display: block;
                height: 60px;
                width: 60px;
                opacity: 0.3;

                &.active {
                    opacity: 1;
                }
            }

            &-up, &-down {
                left: 50%;
                margin-left: -30px;

                &-icon {
                    height: 30px;
                    width: 18px;
                    margin: 15px 21px;
                }
            }

            &-left, &-right {
                top: 50%;
                margin-top: -30px;

                &-icon {
                    height: 18px;
                    width: 30px;
                    margin: 21px 15px;
                }
            }

            &-up {
                top: 30px;
            }

            &-down {
                bottom: 30px;
            }

            &-left {
                left: 30px;
            }

            &-right {
                right: 30px
            }
        }
    }
</style>
