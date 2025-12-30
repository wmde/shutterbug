export const BANNER = 'banner';
export const DEVICE = 'device';
export const ORIENTATION = 'orientation';
export const PLATFORM = 'platform';
export const RESOLUTION = 'resolution';
export const DARKMODE = 'darkmode';

// TODO maybe add union type consisting of the string constants and use that tye in DimensionMap
export type DimensionMap = Map<string,string[]>
