import TitleRow from "@/components/TitleRow.vue";
import ValueRow from "@/components/ValueRow.vue";
import Vue, {VNode} from "vue";

export const MAX_HEADERS = 1;

const Row = Vue.extend({
    functional: true,
    props: {
        headers: Array,
        testcases: Array,
        contextInfo: Array,
    },
    render: function (createElement, context): VNode[] {
        const headerLength = context.props.headers.length;
        const elements = [];
        // Add additional title rows when the headers have more than 1 element, indicating the start of a new "subsection"
        for (let i = 0; i < Math.min(headerLength - 1, MAX_HEADERS ); i++) {
            elements.push(createElement(TitleRow, {
                    props: {
                        header: context.props.headers[i]
                    }
                })
            )
        }
        elements.push(createElement(ValueRow, {
                props: {
                    testcases: context.props.testcases,
                    header: context.props.headers[headerLength - 1],
                    'context-info': context.props.contextInfo,
                }
            })
        );
        return elements;
    }

});

export default Row;