import {ALLOWED_DIMENSIONS} from "./Dimensions";
import {TestCaseJsonInterface} from "@/model/TestCaseJsonInterface";

export class TestCase {
    readonly isValid: boolean;
    readonly screenshotFilename: string;

    constructor( readonly dimensions: Map<string,string>, readonly bannerUrl: string, readonly invalidReason = '' ) {
        this.screenshotFilename = [ ...dimensions.values() ].join( '__' ) + '.png';
        this.isValid = invalidReason === '';
    }

    getDimension( name: string ): string {
        if ( !this.dimensions.has( name ) ) {
            throw new Error( `Invalid dimension: ${name}` );
        }
        // Giving a default value because TS doesn't recognize my guard clause,
        // see https://stackoverflow.com/questions/56977024/typescript-reporting-object-is-possibly-undefined-when-it-shouldnt
        return this.dimensions.get( name ) || '';
    }

    static fromObject( obj: TestCaseJsonInterface ): TestCase {
        const dimensions = new Map<string, string>();
        obj.dimensions.forEach( ( [ key, value ] ) => {
            if ( key === undefined || value === undefined ) {
                throw Error('Dimension array must consist of key-value arrays');
            }
            if ( ALLOWED_DIMENSIONS.indexOf( key) === -1 ) {
                throw Error( `Invalid dimension: ${key}`)
            }
            dimensions.set( key, value )
        } );
        return new TestCase( dimensions, obj.bannerUrl, obj.invalidReason );
    }

}