import {BANNER, DimensionMap, PLATFORM} from "@/model/Dimensions";
import {createRowHeaders} from "@/model/createRowHeaders";
import {RowHeader} from "@/model/RowHeader";

describe( 'createRowHeaders', () => {
    it('creates simple headers', () => {
        const dimensions: DimensionMap = new Map<string, string[]>([
            [BANNER, ['ctrl', 'var']]
        ]);
        const rowHeaders = createRowHeaders( dimensions );

        expect( rowHeaders ).toStrictEqual([
            [ new RowHeader( BANNER, 'ctrl', 1) ],
            [ new RowHeader( BANNER, 'var', 1) ],
        ])
    } );

    it('creates nested headers', () => {
        const dimensions: DimensionMap = new Map<string, string[]>([
            [BANNER, ['ctrl', 'var']],
            [PLATFORM, [ 'edge', 'ie11',
                'firefox_win10', 'chrome_win10',
                'safari',
                'firefox_macos', 'chrome_macos',
                'firefox_linux', 'chrome_linux' ]
            ]
        ]);
        const rowHeaders = createRowHeaders( dimensions );

        expect( rowHeaders ).toStrictEqual([
            [ new RowHeader( BANNER, 'ctrl', 9), new RowHeader( PLATFORM, 'edge', 1) ],
            [ new RowHeader( PLATFORM, 'ie11', 1) ],
            [ new RowHeader( PLATFORM, 'firefox_win10', 1) ],
            [ new RowHeader( PLATFORM, 'chrome_win10', 1) ],
            [ new RowHeader( PLATFORM, 'safari', 1) ],
            [ new RowHeader( PLATFORM, 'firefox_macos', 1) ],
            [ new RowHeader( PLATFORM, 'chrome_macos', 1) ],
            [ new RowHeader( PLATFORM, 'firefox_linux', 1) ],
            [ new RowHeader( PLATFORM, 'chrome_linux', 1) ],

            [ new RowHeader( BANNER, 'var', 9), new RowHeader( PLATFORM, 'edge', 1) ],
            [ new RowHeader( PLATFORM, 'ie11', 1) ],
            [ new RowHeader( PLATFORM, 'firefox_win10', 1) ],
            [ new RowHeader( PLATFORM, 'chrome_win10', 1) ],
            [ new RowHeader( PLATFORM, 'safari', 1) ],
            [ new RowHeader( PLATFORM, 'firefox_macos', 1) ],
            [ new RowHeader( PLATFORM, 'chrome_macos', 1) ],
            [ new RowHeader( PLATFORM, 'firefox_linux', 1) ],
            [ new RowHeader( PLATFORM, 'chrome_linux', 1) ],
        ])
    })
})