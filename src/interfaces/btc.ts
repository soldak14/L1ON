export interface FeeRates
{
	"fastestFee": number,
	"halfHourFee": number,
	"hourFee": number,
	"economyFee": number,
	"minimumFee": number
}

export interface IApiUtxo
{
	txid: string,
	vout: number,
	value: number,
	status: { confirmed: boolean }
}

export interface IUtxo
{
	txid: string,
	vout: number,
	value: number,
}