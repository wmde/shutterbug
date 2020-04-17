import {TestCaseJsonInterface} from "@/model/TestCaseJsonInterface";

// Thanks to https://stackoverflow.com/a/59906630/130121
type ArrayLengthMutationKeys = 'splice' | 'push' | 'pop' | 'shift' | 'unshift' | number
type ArrayItems<T extends Array<any>> = T extends Array<infer TItems> ? TItems : never
type FixedLengthArray<T extends any[]> =
    Pick<T, Exclude<keyof T, ArrayLengthMutationKeys>>
    & { [Symbol.iterator]: () => IterableIterator< ArrayItems<T> > }

export interface ScreenshotMetaDataJsonInterface {
    createdOn: number,
    campaign: string,
    dimensions: Array<FixedLengthArray<[string, string[]]>>,
    testCases: TestCaseJsonInterface[]
}