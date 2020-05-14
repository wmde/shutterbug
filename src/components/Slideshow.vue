<template>
    <div class="slideshow" :class="{'is-visible' : slideshowIsVisible}">
        <a href="" class="slideshow--close" v-on:click.prevent="$emit('close-slideshow')">
            <Icon :icon="'close'" class="slideshow--close-icon"></Icon>
        </a>
        <div class="slideshow--screenshot">
            <img v-if="currentTestcase.isValid" :src="`screenshots/${campaign}/${currentTestcase.screenshotFilename}`" :alt="currentTestcase.screenshotFilename">
            <span v-else>
                {{currentTestcase.invalidReason}}
            </span>
            <span class="slideshow--testcase-metadata">
                <span v-for="dimensionName in dimensions.keys()"
                        :key="dimensionName">
                            {{ currentTestcase.dimensions.get( dimensionName ) || '' }}
                </span>
            </span>
        </div>
        <a href="" v-if="canNavigateLeft" v-on:click.prevent="$emit('navigate-by', -1, 0)" class="slideshow--controls-left">
            <Icon :icon="'left'" class="slideshow--controls-left-icon"></Icon>
        </a>
        <a href="" v-if="canNavigateUp" v-on:click.prevent="$emit('navigate-by',0, -1)" class="slideshow--controls-up">
            <Icon :icon="'up'" class="slideshow--controls-up-icon"></Icon>
        </a>
        <a href="" v-if="canNavigateDown" v-on:click.prevent="$emit('navigate-by', 0, 1)" class="slideshow--controls-down">
            <Icon :icon="'down'" class="slideshow--controls-down-icon"></Icon>
        </a>
        <a href="" v-if="canNavigateRight" v-on:click.prevent="$emit('navigate-by', 1, 0)" class="slideshow--controls-right">
            <Icon :icon="'right'" class="slideshow--controls-right-icon"></Icon>
        </a>
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

        visibility: hidden;
        transform: scale(1.2);
        opacity: 0;
        transition: transform $transition-ease, opacity $transition-ease, visibility $transition-ease;

        &.is-visible {
            visibility: visible;
            transform: scale(1);
            opacity: 1;
        }

        &--screenshot {
            position: absolute;
            display: flex;
            flex-direction: column;
            top: 100px;
            bottom: 100px;
            left: 100px;
            right: 100px;
            padding: 100px;
            justify-content: center;
            align-items: center;
            text-align: center;
            color: $font-color-light;

            img {
                width: auto;
                flex-shrink: 1;
            }
        }

        &--close {
            position: absolute;
            top: 20px;
            right: 20px;
            height: 60px;
            width: 60px;

            &-icon {
                height: 30px;
                width: 30px;
                margin: 15px;
            }
        }

        &--controls {
            &-up, &-down, &-left, &-right {
                position: absolute;
                display: block;
                height: 60px;
                width: 60px;
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
