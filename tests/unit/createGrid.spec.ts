import fs from "fs";
import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";
import {BANNER, PLATFORM, RESOLUTION} from "@/model/Dimensions";
import {createGrid} from "@/model/createGrid";

describe('createGrid', () => {

    const buf = fs.readFileSync( __dirname + '/example_metadata.json' );
    const metaData = ScreenshotMetaData.fromObject( JSON.parse( buf.toString() ) );
    const testCases = metaData.testCases;

    it( 'can create a grid from banner dimension', () => {
        const rowDimensions = metaData.getDimensionSubset([RESOLUTION]) ;
        const orderByDimensions = [ PLATFORM, BANNER ];
        const grid = createGrid( testCases, rowDimensions, orderByDimensions);

        expect( grid.length).toBe( 2 );
        expect( grid[0][0].getDimension( RESOLUTION )).toBe( '1024x768' );
        expect( grid[1][0].getDimension( RESOLUTION )).toBe( '1280x960' );
    } );

    it( 'sorts the columns', () => {
        const rowDimensions = metaData.getDimensionSubset([PLATFORM]) ;
        const orderByDimensions = [ PLATFORM ];
        const grid = createGrid( testCases, rowDimensions, orderByDimensions);

        expect( grid.length).toBe( 9 );
        expect( grid[0].length).toBe( 2 );
        expect( grid[0][0].screenshotFilename).toBe( 'chrome_linux__1024x768__ctrl.png' );
        expect( grid[0][1].screenshotFilename).toBe( 'chrome_linux__1280x960__ctrl.png' );
        expect( grid[1][0].screenshotFilename).toBe( 'chrome_macos__1024x768__ctrl.png' );
        expect( grid[1][1].screenshotFilename).toBe( 'chrome_macos__1280x960__ctrl.png' );
        expect( grid[2][0].screenshotFilename).toBe( 'chrome_win10__1024x768__ctrl.png' );
        expect( grid[2][1].screenshotFilename).toBe( 'chrome_win10__1280x960__ctrl.png' );
    } );

    it( 'can create a grid from multiple banner dimensions', () => {
        const rowDimensions = metaData.getDimensionSubset([RESOLUTION, PLATFORM]) ;
        const orderByDimensions = [ RESOLUTION ];
        const grid = createGrid( testCases, rowDimensions, orderByDimensions);

        expect( grid.length).toBe( 18 );
        expect( grid[0].length).toBe( 1 );
        expect( grid[0][0].screenshotFilename).toBe( 'chrome_linux__1024x768__ctrl.png' );
        expect( grid[1][0].screenshotFilename).toBe( 'chrome_macos__1024x768__ctrl.png' );
        expect( grid[2][0].screenshotFilename).toBe( 'chrome_win10__1024x768__ctrl.png' );
        expect( grid[3][0].screenshotFilename).toBe( 'edge__1024x768__ctrl.png' );
        expect( grid[4][0].screenshotFilename).toBe( 'firefox_linux__1024x768__ctrl.png' );
        expect( grid[9][0].screenshotFilename).toBe( 'chrome_linux__1280x960__ctrl.png' );
        expect( grid[12][0].screenshotFilename).toBe( 'edge__1280x960__ctrl.png' );
    } );
} );