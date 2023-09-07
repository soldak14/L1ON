interface Window
{
	unisat: {
		requestAccounts(): Promise<string>,
		getAccounts(): Promise<string[]>,
		getNetwork(): Promise<"livenet" | "testnet">,
		switchNetwork(network: "livenet" | "testnet"): Promise<void>,
		getPublicKey(): Promise<string>,
		getBalance(): Promise<string>,
		getInscriptions(cursor: number, size: number): Promise<{
			"total": number,
			"list": [
				{
					inscriptionId: string,
					inscriptionNumber: number,
					address: string,
					outputValue: number,
					preview: string,
					content: string,
					contentLength: number,
					contentType: string,
					timestamp: number,
					genesisTransaction: string,
					location: string,
					output: string,
					offset: number
				}
			]
		}>,
		sendBitcoin(address: string, amount: number): Promise<string>,
		sendInscription(address: string, inscriptionId: string, options?: { feeRate: number }): Promise<{
			txId: string
		}>,
		signMessage(message: string, type?: "ecdsa" | "bip322-simple"): Promise<string>,
		pushTx(data: { rawtx: string }): Promise<string>,
		signPsbt(psbtHex: string, options: { autoFinalized: boolean }): Promise<string>,
		signPsbts(psbtHex: string[], options: { autoFinalized: boolean }[]): Promise<string>,
		pushPsbt(psbtHex: string): Promise<string>,
		on: any
		removeListener: any
	};
	btc: {
		request(r: "getAddresses" | "sendTransfer" | "signPsbt" | "signMessage", p?: any): Promise<{
			result: { addresses:
					{ symbol: string, type: string, address: string, publicKey: string }[]
			} | {

			}
		} | any>,
	};

	ordinalSafe: {
		requestAccounts(): Promise<string[]>;
		forgetIdentity(): Promise<string>;
		signPsbt(psbt: string): Promise<string>;
		sendBitcoin(address: string, amountInSats: number): Promise<string>;
		sendInscription(address: string, inscriptionId: string): Promise<string>;
		switchNetwork(network: "mainnet" | "testnet"): Promise<string>;
		getNetwork(): Promise<string>;
		getBalance(): Promise<number>;
		getInscriptions(): Promise<string[]>;
		getUTXOs(p: "all" | "cardinals" | "ordinals"): Promise<{
			status: string; // mined or unconfirmed
			txId: string;
			index: number;
			value: number;
			script: string;
			address: string;
			blockHeight: number;
			type: string;
			inscriptions?: {
				id: string;
				genesisFee: number;
				genesisHeight: number;
				number: number;
				satpoint: string;
				timestamp: number;
			}[];
		}[]>;
	}

	HiroWalletProvider: boolean;

}
