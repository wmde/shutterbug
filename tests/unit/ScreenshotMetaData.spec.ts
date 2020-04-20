import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";
import {ScreenshotMetaDataJsonInterface} from "@/model/ScreenshotMetaDataJsonInterface";
import {BANNER, BROWSER, OPERATING_SYSTEM, RESOLUTION} from "@/model/Dimensions";

describe('ScreenshotMetaData', () => {

    const rawData: ScreenshotMetaDataJsonInterface = {
        createdOn: 1234,
        campaign: '00-ba-200416',
        dimensions: [
            [
                "operating_system",
                [
                    "win10",
                    "win7",
                    "macos",
                    "linux"
                ]
            ],
            [
                "browser",
                [
                    "edge",
                    "ie11",
                    "firefox",
                    "safari",
                    "chrome"
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
            }
        ]
    };

    describe('fromObject', () => {
        it('creates an instance', () => {
            const metaData = ScreenshotMetaData.fromObject( rawData );

            expect( metaData.createdOn ).toStrictEqual( new Date(1234) );
            expect( metaData.campaign ).toBe( '00-ba-200416');
            expect( metaData.dimensions.size ).toBe( 4 );
            expect( metaData.testCases.length ).toBe( 1 );
        });

        xit('validates dimensions', () => {
            // TODO
        })
    });

    it('can get subset of dimensions', () => {
        const metaData = ScreenshotMetaData.fromObject( rawData );

        const dimensionSubSet = metaData.getDimensionSubset( [ BANNER, BROWSER ] );

        expect( dimensionSubSet.get(BANNER) ).toStrictEqual( ['ctrl'] )
        expect( dimensionSubSet.get(BROWSER) ).toStrictEqual( [
            "edge",
            "ie11",
            "firefox",
            "safari",
            "chrome"
        ] )
    })

    it('can get the remaining dimensions', () => {
        const metaData = ScreenshotMetaData.fromObject( rawData );

        const remaining = metaData.getRemainingDimensions( [ BANNER, BROWSER ] );

        expect( remaining ).toStrictEqual( [ OPERATING_SYSTEM, RESOLUTION] );
    } );


    describe( 'getSortDimensionsNames combines all dimensions', () => {
        it( 'combines all dimensions', () => {
            const metaData = ScreenshotMetaData.fromObject( rawData );

            const dimensionCombinations = metaData.getSortDimensionsNames( BANNER );

            expect( dimensionCombinations.sort() ).toStrictEqual([
                [ OPERATING_SYSTEM, RESOLUTION, BROWSER ],
                [ RESOLUTION, OPERATING_SYSTEM, BROWSER ],
                [ RESOLUTION, BROWSER, OPERATING_SYSTEM ],
                [ OPERATING_SYSTEM, BROWSER, RESOLUTION ],
                [ BROWSER, RESOLUTION, OPERATING_SYSTEM ],
                [ BROWSER, OPERATING_SYSTEM, RESOLUTION ],
            ].sort())
        })


        it('drops dimensions with 1 value', () => {
            // BANNER in example data has only 1 value, so that is dropped
            const metaData = ScreenshotMetaData.fromObject( rawData );

            const dimensionCombinations = metaData.getSortDimensionsNames( BROWSER );

            expect( dimensionCombinations ).toStrictEqual([
                [ OPERATING_SYSTEM, RESOLUTION ],
                [ RESOLUTION, OPERATING_SYSTEM ]
            ])
        } )
    })

});