import { BROWSER, OPERATING_SYSTEM, RESOLUTION} from "@/model/Dimensions";
import {createDimensionCombinations} from "@/model/createDimensionCombinations";

describe( 'createDimensionCombinations', () => {
    it( 'combines all dimensions', () => {

        const dimensionCombinations = createDimensionCombinations( [ OPERATING_SYSTEM, RESOLUTION, BROWSER ]  );

        expect( dimensionCombinations.sort() ).toStrictEqual([
            [ OPERATING_SYSTEM, RESOLUTION, BROWSER ],
            [ RESOLUTION, OPERATING_SYSTEM, BROWSER ],
            [ RESOLUTION, BROWSER, OPERATING_SYSTEM ],
            [ OPERATING_SYSTEM, BROWSER, RESOLUTION ],
            [ BROWSER, RESOLUTION, OPERATING_SYSTEM ],
            [ BROWSER, OPERATING_SYSTEM, RESOLUTION ],
        ].sort())
    } );

} );