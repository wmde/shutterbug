import TitleRow from "@/components/TitleRow.vue";
import ValueRow from "@/components/ValueRow.vue";
import Vue, {VNode} from "vue";

const Row = Vue.extend({
    functional: true,
    props: {
        headers: Array,
        testcases: Array
    },
    render: function (createElement, context): VNode[] {
        const headerLength = context.props.headers.length;
        const elements = [];
        // Add additional title rows when the headers have more than 1 element, indicating the start of a new "subsection"
        for (let i = 0; i < headerLength - 1; i++) {
            elements.push(createElement(TitleRow, {
                    props: {
                        header: context.props.headers[i],
                        columns: context.props.testcases.length
                    }
                })
            )
        }
        elements.push(createElement(ValueRow, {
                props: {
                    testcases: context.props.testcases,
                    header: context.props.headers[headerLength - 1]
                }
            })
        );
        return elements;
    }

});

export default Row;