// TODO maybe use types instead of string constants here
export const BANNER = 'banner';
export const DEVICE = 'device';
export const PLATFORM = 'platform';
export const ORIENTATION = 'orientation';
export const RESOLUTION = 'resolution';
export const ALLOWED_DIMENSIONS = [BANNER, DEVICE, PLATFORM, ORIENTATION, RESOLUTION];

export type DimensionMap = Map<string,string[]>