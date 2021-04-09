import { TestCase } from "@/model/TestCase";
import { DimensionMap } from "@/model/Dimensions";
import { MetaData } from "@/model/parseMetadata";

export class ScreenshotMetaData {
    constructor( readonly createdOn: Date, readonly campaign: string, readonly dimensions: DimensionMap, readonly testCases: TestCase[]) {
    }

    public static fromObject( obj: MetaData ): ScreenshotMetaData {
        const dimensions: DimensionMap = new Map(obj.dimensions);
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
}
