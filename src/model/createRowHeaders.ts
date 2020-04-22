import {DimensionMap} from "@/model/Dimensions";
import {RowHeader} from "@/model/RowHeader";

function multiplyLengths( arr: Array<string[]> ) {
    return arr.reduce( (multipliedLength, values ) => multipliedLength * values.length, 1 );
}

export function createRowHeaders( dimensions: DimensionMap ): RowHeader[][] {
    const dimensionValueArray = [...dimensions.values()];

    // Number of rows is the length of all dimension value array multiplied
    const rowCount = multiplyLengths(dimensionValueArray);

    // Each "level" of headers spans a number of rows equal to the product of the lengths of all following dimension arrays
    const spanSizes = [];
    for( let i=0; i< dimensionValueArray.length; i++ ) {
        spanSizes.push( multiplyLengths( dimensionValueArray.slice( i+1 ) ));
    }

    const headers: RowHeader[][] = Array(rowCount);
    let depth = 0;
    for( const [dimensionName, dimensionValues] of dimensions.entries() ) {
        const step = spanSizes[depth];
        // Distribute the dimension values in steps according to their span size
        for( let rowIndex=0; rowIndex < rowCount; rowIndex += step ) {
            if(!headers[rowIndex]) {
                headers[rowIndex] = [];
            }
            // "iteration" normalize the jumping row index back to a 0,1,2,3... progression of values
            const iteration = rowIndex / step;
            // The indices for dimension values have to oscillate between 0 and dimensionValues.length-1, hence the modulo
            const valueIndex = iteration % dimensionValues.length;
            headers[rowIndex].push( new RowHeader( dimensionName, dimensionValues[valueIndex], spanSizes[depth] ) );
        }
        depth++;
    }

    return headers;
}