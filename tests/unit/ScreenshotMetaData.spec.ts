import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";
import {MetaData as RawMetadata} from "@/model/parseMetadata";
import {BANNER, PLATFORM, RESOLUTION} from "@/model/Dimensions";

describe('ScreenshotMetaData', () => {

    const rawData: RawMetadata = {
        createdOn: 1234,
        campaign: '00-ba-200416',
        dimensions: [
            [
                "platform",
                [ "edge", "ie11",
                    "firefox_win10", "chrome_win10",
                    "safari",
                    "firefox_macos", "chrome_macos",
                    "firefox_linux", "chrome_linux"
                ]
            ],
            [
                "resolution",
                [
                    "1024x768",
                    "1280x960"
                ]
            ],
            [
                "banner",
                [
                    "ctrl"
                ]
            ]
        ],
        testCases: [
            {
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
            }
        ]
    };

    describe('fromObject', () => {
        it('creates an instance', () => {
            const metaData = ScreenshotMetaData.fromObject( rawData );

            expect( metaData.createdOn ).toStrictEqual( new Date(1234) );
            expect( metaData.campaign ).toBe( '00-ba-200416');
            expect( metaData.dimensions.size ).toBe( 3 );
            expect( metaData.testCases.length ).toBe( 1 );
        });

        xit('validates dimensions', () => {
            // TODO
        })
    });

    it('can get subset of dimensions', () => {
        const metaData = ScreenshotMetaData.fromObject( rawData );

        const dimensionSubSet = metaData.getDimensionSubset( [ BANNER, PLATFORM ] );

        expect( dimensionSubSet.get(BANNER) ).toStrictEqual( ['ctrl'] )
        expect( dimensionSubSet.get(PLATFORM) ).toStrictEqual( [
            "edge", "ie11",
            "firefox_win10", "chrome_win10",
            "safari",
            "firefox_macos", "chrome_macos",
            "firefox_linux", "chrome_linux"
        ] )
    })

    it('can get the remaining dimensions', () => {
        const metaData = ScreenshotMetaData.fromObject( rawData );

        const remaining = metaData.getRemainingDimensions( [ BANNER, PLATFORM ] );

        expect( remaining ).toStrictEqual( [RESOLUTION] );
    } );

});
