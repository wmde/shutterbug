import {TestCase} from "@/model/TestCase";

function createDimensionSorter( dimensionOrder: string[] ) {
    return function( testcaseA: TestCase, testCaseB: TestCase ) {
        for( let i=0; i < dimensionOrder.length; i++ ) {
            const dimension = dimensionOrder[i];
            // TOOD create a special comparison function for resolution
            if ( testcaseA.getDimension( dimension ) > testCaseB.getDimension( dimension ) ) {
                return 1;
            }
            if ( testcaseA.getDimension( dimension ) < testCaseB.getDimension( dimension ) ) {
                return -1;
            }
        }
        return 0;
    }
}

function cutArray( arr: TestCase[], partitionSize: number ): TestCase[][] {
    const partitions = []
    for( let i = 0; i < arr.length; i+= partitionSize ) {
        partitions.push( arr.slice( i, i + partitionSize ) );
    }
    return partitions;
}


export function createGrid( testcases: TestCase[], rowDimensions: Map<string, string[]>, orderByDimensions: string[] ) {
    const compareAllDimensions = createDimensionSorter( Array.from( rowDimensions.keys() ).concat( orderByDimensions ) );
    testcases.sort( compareAllDimensions );

    let rows: TestCase[][] = [testcases];
    rowDimensions.forEach( ( dimensionValues ) => {
        const sliceSize = rows[0].length / dimensionValues.length;
        const newRows: TestCase[][] = [];
        rows.forEach( row => cutArray( row, sliceSize ).forEach( newRow => newRows.push( newRow) ) )
        rows = newRows
    } );

    return rows;
}