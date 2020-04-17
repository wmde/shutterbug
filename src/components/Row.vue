<template>
    <tr class="row">
        <!-- TODO array of headers label will be passed as prop in from parent & rendered, replacing TitleRow -->
        <td class="row--label">
            <div class="row--label-content">
                <span class="row--label-text">{{ label }}</span>
            </div>
        </td>

        <td class="row--screenshot" v-for="testcase in testcases" v-bind:key="testcase.screenshotFilename">
            <div class="row--screenshot-content">
                <div>{{testcase.screenshotFilename}}</div>
                <img v-if="testcase.isValid" :src="`screenshots/${testcase.screenshotFilename}`" :alt="testcase.screenshotFilename">
                <span v-else>{{testcase.invalidReason}}</span>
            </div>
        </td>
    </tr>
</template>

<script>
	export default {
		name: "Row",
        props: ['testcases', 'label']
	}
</script>

<style lang="scss">
    @import "src/assets/settings";

    .row {
        padding-bottom: $row-padding;

        &--label {
            position: relative;
            width: $axis-size;
            background: $axis-background-color;

            &-content {
                position: static;
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
            }
        }
    }
</style>