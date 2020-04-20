<template>
    <tr class="row">

        <td class="row--label">
            <div class="row--label-content">
                <span class="row--label-text">{{ header.label }}</span>
            </div>
        </td>

        <td class="row--screenshot" v-for="testcase in testcases" v-bind:key="testcase.screenshotFilename" :class="{'invalid' : testcase.isValid}">
            <div class="row--screenshot-content">
                <div v-if="testcase.isValid">
                    <img :src="`screenshots/${testcase.screenshotFilename}`" :alt="testcase.screenshotFilename">
                    <div class="row--screenshot-metadata">Resolution: 1024x768</div>
                </div>
                <div v-else class="row--screenshot-invalid-reason">
                    <div class="row--screenshot-invalid-reason-text">{{testcase.invalidReason}}</div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
	import {RowHeader} from "@/model/RowHeader";

	export default {
		name: "ValueRow",
        props: {
			testcases: Array,
			header: RowHeader
		}
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .row {
        padding-bottom: $row-padding;

        &--label {
            position: relative;
            background: $axis-background-color;

            &-content {
                position: absolute;
                width: $axis-size;
                height: 100%;
                color: $axis-color;
                padding-bottom: $row-padding;
                top: 0;
            }

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
            padding-bottom: 60px;

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
            }

            &-metadata {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 60px;
                line-height: 30px;
                font-weight: bold;
                font-size: 12px;
                text-align: center;
            }

            &-invalid-reason {
                position: absolute;
                top: 0;
                bottom: 60px;
                left: ($stage-gutter/2);
                right: ($stage-gutter/2);
                background: #eee;

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