import fs from "fs";
import {ScreenshotMetaData} from "@/model/ScreenshotMetaData";
import {BANNER, BROWSER, OPERATING_SYSTEM, RESOLUTION} from "@/model/Dimensions";
import {createGrid} from "@/model/createGrid";

describe('createGrid', () => {

    const buf = fs.readFileSync( __dirname + '/example_metadata.json' );
    const metaData = ScreenshotMetaData.fromObject( JSON.parse( buf.toString() ) );
    const testCases = metaData.testcases;

    it( 'can create a grid from banner dimension', () => {
        const rowDimensions = metaData.getDimensionSubset([RESOLUTION]) ;
        const orderByDimensions = [ OPERATING_SYSTEM, BROWSER, BANNER ];
        const grid = createGrid( testCases, rowDimensions, orderByDimensions);

        expect( grid.length).toBe( 2 );
        expect( grid[0][0].getDimension( RESOLUTION )).toBe( '1024x768' );
        expect( grid[1][0].getDimension( RESOLUTION )).toBe( '1280x960' );
    } );

    it( 'sorts the columns', () => {
        const rowDimensions = metaData.getDimensionSubset([BROWSER]) ;
        const orderByDimensions = [ RESOLUTION, OPERATING_SYSTEM ];
        const grid = createGrid( testCases, rowDimensions, orderByDimensions);

        expect( grid.length).toBe( 5 );
        expect( grid[0].length).toBe( 8 );
        expect( grid[0][0].screenshotFilename).toBe( 'linux__chrome__1024x768__ctrl.png' );
        expect( grid[0][1].screenshotFilename).toBe( 'macos__chrome__1024x768__ctrl.png' );
        expect( grid[0][2].screenshotFilename).toBe( 'win10__chrome__1024x768__ctrl.png' );
        expect( grid[0][3].screenshotFilename).toBe( 'win7__chrome__1024x768__ctrl.png' );
        expect( grid[0][4].screenshotFilename).toBe( 'linux__chrome__1280x960__ctrl.png' );
        expect( grid[0][5].screenshotFilename).toBe( 'macos__chrome__1280x960__ctrl.png' );
    } );

    it( 'can create a grid from multiple banner dimensions', () => {
        const rowDimensions = metaData.getDimensionSubset([RESOLUTION, BROWSER]) ;
        const orderByDimensions = [ OPERATING_SYSTEM ];
        const grid = createGrid( testCases, rowDimensions, orderByDimensions);

        expect( grid.length).toBe( 10 );
        expect( grid[0].length).toBe( 4 );
        expect( grid[0][0].screenshotFilename).toBe( 'linux__chrome__1024x768__ctrl.png' );
        expect( grid[0][1].screenshotFilename).toBe( 'macos__chrome__1024x768__ctrl.png' );
        expect( grid[1][2].screenshotFilename).toBe( 'win10__edge__1024x768__ctrl.png' );
        expect( grid[1][3].screenshotFilename).toBe( 'win7__edge__1024x768__ctrl.png' );
        expect( grid[2][0].screenshotFilename).toBe( 'linux__firefox__1024x768__ctrl.png' );
        expect( grid[2][1].screenshotFilename).toBe( 'macos__firefox__1024x768__ctrl.png' );
        expect( grid[9][0].screenshotFilename).toBe( 'linux__safari__1280x960__ctrl.png' );
        expect( grid[9][1].screenshotFilename).toBe( 'macos__safari__1280x960__ctrl.png' );
    } );
} );