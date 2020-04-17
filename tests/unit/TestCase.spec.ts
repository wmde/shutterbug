import {TestCase} from "@/model/TestCase";
import {BANNER, BROWSER, OPERATING_SYSTEM, RESOLUTION} from "@/model/Dimensions";

describe('TestCase', () => {
    describe( 'fromObject', () => {
        it('creates an instance', () => {
            const testCase = TestCase.fromObject( {
                "invalidReason": "Unsupported resolution",
                "dimensions": [
                    [
                        "operating_system",
                        "win10"
                    ],
                    [
                        "browser",
                        "edge"
                    ],
                    [
                        "resolution",
                        "1024x768"
                    ],
                    [
                        "banner",
                        "ctrl"
                    ]
                ],
                "bannerUrl": "https://de.wikipedia.org/wiki/Wikipedia:Hauptseite?banner=B20_WMDE_Test_Desktop",
            } );

            expect( testCase.getScreenshotFilename() ).toBe( 'win10__edge__1024x768__ctrl.png' );
            expect( testCase.getBannerUrl() ).toBe( 'https://de.wikipedia.org/wiki/Wikipedia:Hauptseite?banner=B20_WMDE_Test_Desktop' );
            expect( testCase.isValid() ).toBe( false );
            expect( testCase.getInvalidReason ).toBe( 'Unsupported resolution' );
            expect( testCase.getDimensions().size ).toBe( 4 );
            expect( testCase.getDimension( OPERATING_SYSTEM ) ).toBe( 'win10' );
            expect( testCase.getDimension( BROWSER ) ).toBe( 'edge' );
            expect( testCase.getDimension( RESOLUTION ) ).toBe( '1024x768' );
            expect( testCase.getDimension( BANNER ) ).toBe( 'ctrl' );
        } );

        it('validates dimension tuples', () => {
            expect( () => {
                TestCase.fromObject( {
                    dimensions: [ ['browser'] ],
                    bannerUrl: '',
                    invalidReason: ''
                } );
            }).toThrow('Dimension array must consist of key-value arrays')
        } );

        it('allows only valid dimensions', () => {
            expect( () => {
                TestCase.fromObject( {
                    dimensions: [ ['pudding', 'chocolate'] ],
                    bannerUrl: '',
                    invalidReason: ''
                } )
            }).toThrow('Invalid dimension: pudding')
        })
    } )

} );
