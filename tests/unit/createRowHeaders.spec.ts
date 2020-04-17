import {BANNER, BROWSER, DimensionMap, OPERATING_SYSTEM} from "@/model/Dimensions";
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
            [BROWSER, ['chrome', 'edge', 'firefox']]
        ]);
        const rowHeaders = createRowHeaders( dimensions );

        expect( rowHeaders ).toStrictEqual([
            [ new RowHeader( BANNER, 'ctrl', 3), new RowHeader( BROWSER, 'chrome', 1) ],
            [ new RowHeader( BROWSER, 'edge', 1) ],
            [ new RowHeader( BROWSER, 'firefox', 1) ],
            [ new RowHeader( BANNER, 'var', 3), new RowHeader( BROWSER, 'chrome', 1)  ],
            [ new RowHeader( BROWSER, 'edge', 1) ],
            [ new RowHeader( BROWSER, 'firefox', 1) ],
        ])
    })

    it('creates deeply nested headers', () => {
        const dimensions: DimensionMap = new Map<string, string[]>([
            [BANNER, ['ctrl', 'var']],
            [BROWSER, ['chrome', 'edge', 'firefox']],
            [OPERATING_SYSTEM, ['win10', 'macos']],
        ]);
        const rowHeaders = createRowHeaders( dimensions );

        expect( rowHeaders ).toStrictEqual([
            [ new RowHeader( BANNER, 'ctrl', 6), new RowHeader( BROWSER, 'chrome', 2), new RowHeader( OPERATING_SYSTEM, 'win10', 1) ],
            [ new RowHeader( OPERATING_SYSTEM, 'macos', 1) ],
            [ new RowHeader( BROWSER, 'edge', 2), new RowHeader( OPERATING_SYSTEM, 'win10', 1) ],
            [ new RowHeader( OPERATING_SYSTEM, 'macos', 1) ],
            [ new RowHeader( BROWSER, 'firefox', 2), new RowHeader( OPERATING_SYSTEM, 'win10', 1) ],
            [ new RowHeader( OPERATING_SYSTEM, 'macos', 1) ],
            [ new RowHeader( BANNER, 'var', 6), new RowHeader( BROWSER, 'chrome', 2), new RowHeader( OPERATING_SYSTEM, 'win10', 1) ],
            [ new RowHeader( OPERATING_SYSTEM, 'macos', 1) ],
            [ new RowHeader( BROWSER, 'edge', 2), new RowHeader( OPERATING_SYSTEM, 'win10', 1) ],
            [ new RowHeader( OPERATING_SYSTEM, 'macos', 1) ],
            [ new RowHeader( BROWSER, 'firefox', 2), new RowHeader( OPERATING_SYSTEM, 'win10', 1) ],
            [ new RowHeader( OPERATING_SYSTEM, 'macos', 1) ],
        ])
    })
})