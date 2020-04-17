import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";

describe('ScreenshotMetaData', () => {
    describe('fromObject', () => {
        it('creates an instance', () => {
            const metaData = ScreenshotMetaData.fromObject({
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
            });

            expect( metaData.createdOn ).toStrictEqual( new Date(1234) );
            expect( metaData.campaign ).toBe( '00-ba-200416');
            expect( metaData.dimensions.size ).toBe( 4 );
            expect( metaData.testcases.length ).toBe( 1 );
        });

        xit('validates dimensions', () => {
            // TODO
        })
    });
});