import { action, makeObservable, observable } from "mobx";
import { FeeRates } from "../interfaces/btc";

export class BtcDataModel
{
	public price = 0;
	public fees?:FeeRates;

	constructor()
	{
		makeObservable(this, {
			price: observable,
			fees: observable,
			updateFees: action,
			updatePrice: action,
		});
	}

	updateFees(fees:FeeRates)
	{

		this.fees = fees;
	}

	updatePrice(price: number)
	{
		this.price = price;
	}

}