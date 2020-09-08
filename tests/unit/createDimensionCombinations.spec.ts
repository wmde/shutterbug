import { PLATFORM, RESOLUTION} from "@/model/Dimensions";
import {createDimensionCombinations} from "@/model/createDimensionCombinations";

describe( 'createDimensionCombinations', () => {
    it( 'combines all dimensions', () => {

        const dimensionCombinations = createDimensionCombinations( [ PLATFORM, RESOLUTION ]  );

        expect( dimensionCombinations.sort() ).toStrictEqual([
            [ PLATFORM, RESOLUTION ],
            [ RESOLUTION, PLATFORM ],
        ].sort())
    } );

} );