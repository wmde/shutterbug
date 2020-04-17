import {ALLOWED_DIMENSIONS} from "./Dimensions";
import {TestCaseJsonInterface} from "@/model/TestCaseJsonInterface";


export class TestCase {
    private readonly valid: boolean;
    private readonly invalidReason: string;
    private readonly dimensions: Map<string, string>;
    private readonly bannerUrl: string;
    private readonly screenshotFilename: string;
    constructor( dimensions: Map<string,string>, bannerUrl: string, invalidReason = '' ) {
        this.dimensions = dimensions;
        this.bannerUrl = bannerUrl;
        this.screenshotFilename = [ ...dimensions.values() ].join( '__' ) + '.png';
        this.valid = invalidReason === '';
        this.invalidReason = invalidReason
    }

    isValid(): boolean {
        return this.valid;
    }

    get getInvalidReason(): string {
        return this.invalidReason;
    }


    getBannerUrl(): string {
        return this.bannerUrl;
    }


    getScreenshotFilename(): string {
        return this.screenshotFilename;
    }

    getDimensions(): Map<string,string> {
        return this.dimensions;
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