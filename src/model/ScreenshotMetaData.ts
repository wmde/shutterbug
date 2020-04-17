import {TestCase} from "@/model/TestCase";
import {ScreenshotMetaDataJsonInterface} from "@/model/ScreenshotMetaDataJsonInterface";

type DimensionMap = Map<string, string[]>

export class ScreenshotMetaData {
    constructor( readonly createdOn: Date, readonly campaign:string, readonly dimensions: DimensionMap, readonly testcases: TestCase[]) {
    }

    public static fromObject( obj: ScreenshotMetaDataJsonInterface ): ScreenshotMetaData {
        const dimensions = new Map<string,string[]>();
        obj.dimensions.forEach( ( [ key, dimensionValues] ) => {
            dimensions.set( key, dimensionValues )
        } );
        const testCases = obj.testCases.map( testCaseObj => TestCase.fromObject( testCaseObj ) );
        return new ScreenshotMetaData( new Date( obj.createdOn ), obj.campaign, dimensions, testCases );
    }
}