import { TestCase as RawTestCase } from "@/model/parseMetadata";

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

    isDesktop(): boolean {
        return !this.dimensions.has('device');
    }

    static fromObject( obj: RawTestCase ): TestCase {
        const dimensions = new Map<string, string>(obj.dimensions);
        return new TestCase( dimensions, obj.bannerUrl, obj.invalidReason );
    }

}
