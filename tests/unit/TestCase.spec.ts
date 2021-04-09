import {TestCase} from "@/model/TestCase";
import {BANNER, PLATFORM, RESOLUTION} from "@/model/Dimensions";

describe('TestCase', () => {
    describe( 'fromObject', () => {
        it('creates an instance', () => {
            const testCase = TestCase.fromObject( {
                "invalidReason": "Unsupported resolution",
                "dimensions": [
                    [
                        "platform",
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

            expect( testCase.screenshotFilename ).toBe( 'edge__1024x768__ctrl.png' );
            expect( testCase.bannerUrl ).toBe( 'https://de.wikipedia.org/wiki/Wikipedia:Hauptseite?banner=B20_WMDE_Test_Desktop' );
            expect( testCase.isValid ).toBe( false );
            expect( testCase.invalidReason ).toBe( 'Unsupported resolution' );
            expect( testCase.dimensions.size ).toBe( 3 );
            expect( testCase.getDimension( PLATFORM ) ).toBe( 'edge' );
            expect( testCase.getDimension( RESOLUTION ) ).toBe( '1024x768' );
            expect( testCase.getDimension( BANNER ) ).toBe( 'ctrl' );
        } );
    } );

} );
