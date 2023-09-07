export enum EAppMode
{
	development = "development",
	staging = "staging",
	production = "production",
}

export type TAppMode = keyof typeof EAppMode;