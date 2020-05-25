import TitleRow from "@/components/TitleRow.vue";
import ValueRow from "@/components/ValueRow.vue";
import Vue, {VNode} from "vue";

const Row = Vue.extend({
    functional: true,
    props: {
        campaign: String,
        headers: Array,
        testcases: Array,
        rowIndex: Number,
        selectedYSortOrder: Array,
    },
    render: function (createElement, context): VNode[] {
        const listeners = context.listeners;
        const openSlideshow = listeners['open-slideshow'];
        const { selectedYSortOrder, headers, rowIndex, testcases, campaign } = context.props;
        const elements = [];
        // Add additional title rows when the headers have more than 1 element, indicating the start of a new "subsection"
        const hasSubsectionHeader = selectedYSortOrder.length > 1 && headers.length > 1;
        if( hasSubsectionHeader ) {
            elements.push(createElement(TitleRow, {
                    props: {
                        header: headers[0]
                    }
                })
            )
        }
        elements.push(createElement(ValueRow, {
                props: {
                    campaign,
                    testcases,
                    rowIndex,
                    selectedYSortOrder,
                    header: headers[hasSubsectionHeader ? 1 : 0],
                },
                on: {
                    'open-slideshow':  openSlideshow
                }
            })
        );
        return elements;
    }

});

export default Row;
