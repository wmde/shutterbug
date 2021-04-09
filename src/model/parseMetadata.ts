import { Number, String, Literal, Array, Tuple, Record, Union, Static } from 'runtypes';

const DimensionRunType = Union(
    Literal('banner'),
    Literal('device'),
    Literal('orientation'),
    Literal('platform'),
    Literal('resolution'),
);

const DimensionValueRunType = Tuple(DimensionRunType, String);

const TestCaseRunType = Record({
    invalidReason: String,
    dimensions: Array(DimensionValueRunType),
    bannerUrl: String
} );

const DimensionMapRunType = Tuple(DimensionRunType, Array(String));

const MetaDataRunType = Record({
    createdOn: Number,
    campaign: String,
    dimensions: Array(DimensionMapRunType),
    testCases: Array(TestCaseRunType)
} );


export type MetaData = Static<typeof MetaDataRunType>;
export type TestCase = Static<typeof TestCaseRunType>;

export function parseMetadata(str: string): MetaData  {
    const parsed = JSON.parse(str);
    if (MetaDataRunType.guard(parsed)) {
        return parsed;
    }
    throw Error( 'Invalid metadata' );
}

