import { observer } from "mobx-react";
import { app } from "../../contexts/AppContext";
import { getErrorMessage } from "../../helpers/error_helper";
import { WalletCard } from "../walletCard/WalletCard";
import { useCallback } from "react";
import Styles from "./LoginPopup.module.scss";
import unisat from "../../images/loginPopPup/unisat.svg";
import xverse from "../../images/loginPopPup/xverse.svg";
import hiro from "../../images/loginPopPup/hiro.svg";
import close from "../../images/loginPopPup/close.png";

export const LoginPopup = observer(({ complete }: { complete: () => void }) => {
  const { wallet } = app;

  const login = useCallback(
    async (loginPromise: Promise<void>) => {
      try {
        await loginPromise;
        complete();
      } catch (e: unknown) {
        console.error(e);
        app.notificationService.showError(getErrorMessage(e));
      }
    },
    [complete]
  );

  return (
    <div className={Styles.wallets}>
      <div className={Styles.walletBlock}>
        <button onClick={() => complete()}>
          <img src={close} alt="close" />
        </button>
        <h3 className={Styles.select}>Select a wallet</h3>
        <div className={Styles.walletsList}>
          <div>
            <WalletCard
              icon={unisat}
              title={"UniSat"}
              href={
                "https://chrome.google.com/webstore/detail/unisat-wallet/ppbibelpcjmhbdihakflkdcoccbgbkpo"
              }
              isInstall={!!window.unisat}
              onLogin={() => login(wallet.unisatLogin())}
            />
            <h4 className={Styles.text}>unisat.io</h4>
          </div>
          <div>
            <WalletCard
              icon={xverse}
              title={"Xverse"}
              href={
                "https://chrome.google.com/webstore/detail/xverse-wallet/idnnbdplmphpflfnlkomgpfbpcgelopg"
              }
              isInstall={!!window.BitcoinProvider}
              onLogin={() => login(wallet.xVerseLogin())}
            />
            <h4 className={Styles.text}>xvers.app</h4>
          </div>
          <div>
            <WalletCard
              icon={hiro}
              title={"Hiro"}
              href={
                "https://chrome.google.com/webstore/detail/hiro-wallet/ldinpeekobnhjjdofggfgjlcehhmanlj"
              }
              isInstall={window.HiroWalletProvider}
              onLogin={() => login(wallet.hiroWalletLogin())}
            />
            <h4 className={Styles.text}>hiro.so</h4>
          </div>
          <div>
            <WalletCard
              icon={xverse}
              title={"Ordinals Safe"}
              href={
                "https://chrome.google.com/webstore/detail/ordinalsafe/coefgobimbelhfmhkpndlddjhkphgnep"
              }
              isInstall={!!window.ordinalSafe}
              onLogin={() => login(wallet.ordinalsSafeLogin())}
            />
            <h4 className={Styles.text}>ordinals.or</h4>
          </div>
        </div>
      </div>
    </div>
  );
});
