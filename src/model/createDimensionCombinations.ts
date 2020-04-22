export function createDimensionCombinations( dimensionsA: string[] ): string[][] {
    const results = [];
    const generatedValues = [];
    // clone to avoid modifying the original when shifting values
    const dimensions = new Array<string>().concat( dimensionsA );
    const dimensionsLength = dimensions.length;
    for ( let i = 0; i < dimensionsLength; i++ ) {
        for (let j = 0; j < dimensionsLength; j++) {
            const row = [dimensions[j]];

            for (let k = 0; k < dimensionsLength; k++) {
                if (k == j) {
                    continue;
                }
                row.push( dimensions[k] );
            }
            if ( generatedValues.indexOf( row.join() ) === -1) {
                generatedValues.push( row.join() );
                results.push( row );
            }
        }
        // Shift dimensions to the left
        dimensions.push( dimensions.shift() || '' );
    }
    return results;
}