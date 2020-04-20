<template>
    <form class="sidebar" v-bind:class="{'is-visible' : sidebarIsVisible}">
        <div class="sidebar--content">

            <fieldset>
                <legend>Columns</legend>
                <label>
                    <select :name="'xAxis'" v-model="xAxis">
                        <option value="" disabled>Select X-Axis</option>
                        <option v-for="(value, index) in xAxisOptions" :key="index" :value="value">
                            {{ value }}
                        </option>
                    </select>
                </label>
            </fieldset>

            <fieldset v-show="xAxis">
                <legend>Row Sort</legend>
                <label>
                    <select :name="'yAxisPrimary'" v-model="yAxis">
                        <option value="" disabled>Select Y-Axis</option>
                        <option v-for="(value, index) in sortValues" :key="index" :value="index">
                            {{ value.join(' > ') }}
                        </option>
                    </select>
                </label>
            </fieldset>

            <button class="sidebar--button" v-on:click="onSubmit">
                Sort
            </button>
        </div>
    </form>
</template>

<script>
	import {computed, ref} from '@vue/composition-api';

	export default {
		name: "Sidebar",
		props: [ 'sidebarIsVisible', 'dimensions', 'metadata' ],
		setup( props, { emit } ) {
			const xAxis = ref('');
			const yAxis = ref(0);

			const sortValues = computed(() => {
				if( props.metadata === null ) {
					return [];
				}
				return props.metadata.getSortDimensionsNames( xAxis.value );
			});

			const xAxisOptions = computed(() => {
				return Array.from( props.dimensions.keys() );
			});

			const onSubmit = e => {
				e.preventDefault();

				emit( 'select-axes', {
					xAxis: xAxis.value,
					yAxis: sortValues.value[yAxis.value]
				});
			}

            return {
				xAxis,
                yAxis,
				sortValues,
				xAxisOptions,
				onSubmit
            };
		}
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .sidebar {
        position: fixed;
        width: $sidebar-width;
        height: 100%;
        left: -$sidebar-width;
        background: $sidebar-background;

        transition: left $transition-ease;

        &.is-visible {
            left: 0;
        }

        &--content {
            margin-top: $header-height;
            padding: 20px;
        }

        &--button {
            background: $sidebar-button-background;
            color: $sidebar-button-color;
            font-family: $font-family;
            font-weight: bold;
            display: block;
            border: 0;
            margin: 0;
            padding: 10px 20px;
            width: 100%;
        }

        fieldset {
            border: 0;
            margin: 0;
            padding: 0;
        }

        legend {
            color: $font-color-light;
            text-transform: uppercase;
            margin-bottom: 10px;
        }

        label {
            display: block;
            padding: 0;
            margin-bottom: 20px;
        }

        select {
            border: 1px solid $sidebar-background;
            width: 100%;
            padding: 10px;
            font-family: $font-family;

            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            background-color: #ffffff;
            background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23000000%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'),
            linear-gradient(to bottom, #ffffff 0%, #ffffff 100%);
            background-repeat: no-repeat, repeat;
            background-position: right .7em top 50%, 0 0;
            background-size: .65em auto, 100%;

            &:hover {
                border-color: #888888;
            }

            &:focus {
                border-color: $sidebar-button-background;
                outline: none;
            }
        }
    }
</style>