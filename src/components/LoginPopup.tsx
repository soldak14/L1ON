import { observer } from "mobx-react";
import {app} from "../contexts/AppContext";
import {getErrorMessage} from "../helpers/error_helper";
import {WalletCard} from "./WalletCard";
import {useCallback} from "react";

export const LoginPopup = observer((
	{
		complete,
	}: {
		complete: () => void,
	},
) => {
	const {wallet} = app;

	const login = useCallback(async (loginPromise: Promise<void>) => {
		try {
			await loginPromise;
			complete();
		} catch (e: unknown) {
			console.error(e);
			app.notificationService.showError(getErrorMessage(e));
		}
	}, [complete]);

	return <div>
		<div>
			<button onClick={()=>complete()}>
				close
			</button>
		</div>
		<hr/>
		<div>
			<WalletCard title={"unisat"}
			            href={"https://chrome.google.com/webstore/detail/unisat-wallet/ppbibelpcjmhbdihakflkdcoccbgbkpo"}
			            isInstall={!!window.unisat}
			            onLogin={() => login(wallet.unisatLogin())}
			/>
			<WalletCard title={"xverse"}
			            href={"https://chrome.google.com/webstore/detail/xverse-wallet/idnnbdplmphpflfnlkomgpfbpcgelopg"}
			            isInstall={!!window.BitcoinProvider}
			            onLogin={() => login(wallet.xVerseLogin())}
			/>
			<WalletCard title={"hiro"}
			            href={"https://chrome.google.com/webstore/detail/hiro-wallet/ldinpeekobnhjjdofggfgjlcehhmanlj"}
			            isInstall={window.HiroWalletProvider}
			            onLogin={() => login(wallet.hiroWalletLogin())}
			/>
			<WalletCard title={"ordinals safe"}
			            href={"https://chrome.google.com/webstore/detail/ordinalsafe/coefgobimbelhfmhkpndlddjhkphgnep"}
			            isInstall={!!window.ordinalSafe}
			            onLogin={() => login(wallet.ordinalsSafeLogin())}
			/>
		</div>
	</div>;
});