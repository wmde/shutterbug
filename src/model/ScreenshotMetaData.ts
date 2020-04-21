import {TestCase} from "@/model/TestCase";
import {ScreenshotMetaDataJsonInterface} from "@/model/ScreenshotMetaDataJsonInterface";
import {DimensionMap} from "@/model/Dimensions";

export class ScreenshotMetaData {
    constructor( readonly createdOn: Date, readonly campaign: string, readonly dimensions: DimensionMap, readonly testCases: TestCase[]) {
    }

    public static fromObject( obj: ScreenshotMetaDataJsonInterface ): ScreenshotMetaData {
        const dimensions = new Map<string,string[]>();
        obj.dimensions.forEach( ( [ key, dimensionValues] ) => {
            dimensions.set( key, dimensionValues )
        } );
        const testCases = obj.testCases.map( testCaseObj => TestCase.fromObject( testCaseObj ) );
        return new ScreenshotMetaData( new Date( obj.createdOn ), obj.campaign, dimensions, testCases );
    }

    getDimensionSubset( dimensionNames: string[] ): Map<string,string[]> {
        const subset = new Map<string,string[]>();
        dimensionNames.forEach( name => subset.set( name, this.dimensions.get( name ) || [] ) );
        return subset;
    }

    getRemainingDimensions( dimensionNames: string[] ): string[] {
        return [...this.dimensions.keys()].filter( dimensionName => dimensionNames.indexOf( dimensionName ) === -1 );
    }

    /**
     * Get all possible combinations of dimension names except for the given ones and dimensions that have only 1 value
     * @param dimensionName
     */
    getSortDimensionsNames( dimensionName: string ): string[][] {
        const results = [];
        const generatedValues = [];
        const dimensions = this.getRemainingDimensions( [ dimensionName ] );
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
}