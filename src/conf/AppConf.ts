import { TAppMode } from "./TAppMode";

export class AppConf
{
	readonly appMode = import.meta.env.MODE as TAppMode;
	readonly title = import.meta.env.VITE_APP_TITLE;
	readonly backendUrl = import.meta.env.VITE_APP_BACKEND_URL;
	readonly btcApiUrl = import.meta.env.VITE_BTC_API_URL;
	readonly getFeesUrl = import.meta.env.VITE_GET_FEES_URL;
	readonly network = import.meta.env.VITE_NETWORK as "bitcoin" | "testnet";

	constructor()
	{
	}
}