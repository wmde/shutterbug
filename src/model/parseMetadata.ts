import { Number, String, Literal, Array, Tuple, Record, Union, Static, Optional, ValidationError } from 'runtypes';

const DimensionRunType = Union(
    Literal('banner'),
    Literal('device'),
    Literal('orientation'),
    Literal('platform'),
    Literal('resolution'),
);

const DimensionValueRunType = Tuple(DimensionRunType, String);

const TestCaseStateRunType = Record( {
	stateName: String,
	description: Optional(String)
} );

const TestCaseRunType = Record( {
    dimensions: Array(DimensionValueRunType),
    bannerUrl: String,
	state: TestCaseStateRunType,
} );

const DimensionMapRunType = Tuple(DimensionRunType, Array(String));

const MetaDataRunType = Record({
    createdOn: Union(String,Number),
    campaign: String,
    dimensions: Array( DimensionMapRunType ),
    testCases: Array(TestCaseRunType)
} );


export type MetaData = Static<typeof MetaDataRunType>;
export type TestCase = Static<typeof TestCaseRunType>;
export type TestCaseState = Static<typeof TestCaseStateRunType>;

export function parseMetadata(str: string): MetaData  {
    const parsed = JSON.parse(str);
    if (MetaDataRunType.guard(parsed)) {
        return parsed;
    }
	// `check` throw an exception with extra information about the error
	try {
		MetaDataRunType.check( parsed ); 
	} catch ( e ) {
		if ( e instanceof ValidationError ) {
			console.log( 'Parsing metadata was unsuccessful', e.details );
		}
		throw e;
	}
	// This should never happen and is only here to make TypeScript happy
	throw new Error( 'Guard function passed, but check did not throw exception' );
}

