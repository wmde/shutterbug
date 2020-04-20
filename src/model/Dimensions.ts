// TODO maybe use types instead of string constants here
export const BANNER = 'banner';
export const BROWSER = 'browser';
export const DEVICE = 'device';
export const OPERATING_SYSTEM = 'operating_system';
export const ORIENTATION = 'orientation';
export const RESOLUTION = 'resolution';
export const ALLOWED_DIMENSIONS = [BANNER, BROWSER, DEVICE, OPERATING_SYSTEM, ORIENTATION, RESOLUTION];

export type DimensionMap = Map<string,string[]>