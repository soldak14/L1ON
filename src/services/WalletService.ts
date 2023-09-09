import { base64, hex } from "@scure/base";
import { NETWORK, TEST_NETWORK } from "@scure/btc-signer";
import { AppConfig, showConnect, UserSession } from "@stacks/connect";
import {
  AddressPurpose,
  BitcoinNetworkType,
  getAddress,
  GetAddressOptions,
  GetAddressResponse,
  signTransaction,
  SignTransactionOptions,
} from "sats-connect";
import { getSendBtcTx } from "../helpers/btc";
import { AppModel } from "../models/AppModel";
import { BackendService } from "./BackendService";
import { WorldService } from "./WorldService";
import { LocalDataService } from "./LocalDataService";
import { app } from "../contexts/AppContext";

export enum WALLETS {
  unisat = "unisat",
  hiro = "hiro",
  xVerse = "xVerse",
  ordinalsSafe = "ordinalsSafe",
}

export class WalletService {
  private currentWallet?: WALLETS;

  private removeListeners?: () => void;

  constructor(
    private model: AppModel,
    private world: WorldService,
    private backend: BackendService,
    private localData: LocalDataService
  ) {}

  restoreLogin() {
    if (this.localData.wallet !== undefined) {
      this.currentWallet = this.localData.wallet.wallet as WALLETS;
      this.model.account.login(
        this.localData.wallet.address,
        this.localData.wallet.key,
        this.localData.wallet.address2,
        this.localData.wallet.key2,
        []
      );
    }
  }

  logout() {
    this.model.account.logout();
    this.localData.logout();
    this.model.user_invoices.clear();
    this.model.whitelists.clear();

    if (this.removeListeners) this.removeListeners();
  }

  async unisatLogin() {
    const onAccountChange = () => {
      this.logout();
    };
    const onNetworkChanged = () => {
      this.logout();
    };

    const conf = await this.backend.getConf();
    const network = await window.unisat.getNetwork();

    if (conf.network !== network)
      await window.unisat.switchNetwork(
        conf.network === "bitcoin" ? "livenet" : conf.network
      );

    await window.unisat.requestAccounts();
    const acc = await window.unisat.getAccounts();
    if (acc.length) {
      const key = await window.unisat.getPublicKey();
      const inscr = await window.unisat.getInscriptions(0, 10);

      this.model.account.login(
        acc[0],
        key,
        "",
        "",
        inscr.list.map((it) => it.inscriptionId)
      );
      window.unisat.on("accountsChanged", onAccountChange);
      window.unisat.on("networkChanged", onNetworkChanged);

      this.removeListeners = () => {
        window.unisat.removeListener("accountsChanged", onAccountChange);
        window.unisat.removeListener("networkChanged", onNetworkChanged);
      };
      this.setWallet(WALLETS.unisat);
      return app.notificationService.showInfo("success");
    }
    app.notificationService.showError("Error");
  }

  async hiroWalletLogin() {
    const appConfig = new AppConfig();
    const userSession = new UserSession({ appConfig });

    const resolve = async () => {
      const conf = await this.backend.getConf();
      const network = conf.network === "bitcoin" ? "mainnet" : conf.network;
      const cardinalAddress =
        userSession.loadUserData().profile.btcAddress.p2wpkh[network];
      const ordinalsAddress =
        userSession.loadUserData().profile.btcAddress.p2tr[network];

      const cardinalsPub =
        userSession.loadUserData().profile.btcPublicKey.p2wpkh;
      const ordinalsPub = userSession.loadUserData().profile.btcPublicKey.p2tr;

      this.model.account.login(
        cardinalAddress,
        cardinalsPub,
        ordinalsAddress,
        ordinalsPub,
        []
      );
      this.setWallet(WALLETS.hiro);
      app.notificationService.showInfo("success");
    };

    if (!userSession.isUserSignedIn()) {
      showConnect({
        userSession,
        appDetails: {
          name: "l1on.xyz",
          icon: window.location.origin + "/app-icon.png",
        },
        onFinish: () => {
          resolve();
        },
        onCancel: () => {
          app.notificationService.showError("Error");
          // handle if user closed connection prompt
        },
      });
    } else {
      resolve();
    }
  }

  async xVerseLogin() {
    const conf = await this.backend.getConf();

    const getAddressOptions: GetAddressOptions = {
      payload: {
        purposes: [AddressPurpose.Payment, AddressPurpose.Ordinals],
        message: "Address for receiving Ordinals and payments",
        network: {
          type:
            conf.network === "bitcoin"
              ? BitcoinNetworkType.Mainnet
              : BitcoinNetworkType.Testnet,
        },
      },
      onCancel: () => {
        app.notificationService.showError("Error");
      },
      onFinish: (response: GetAddressResponse) => {
        let address = response.addresses.find(
          (it: { purpose: string; address: string; publicKey: string }) =>
            it.purpose === "payment"
        );

        let p2tr_address = response.addresses.find(
          (it: { purpose: string; address: string; publicKey: string }) =>
            it.purpose === "ordinals"
        );

        if (!address && p2tr_address) address = p2tr_address;

        if (!p2tr_address && address) p2tr_address = address;

        if (!address || !p2tr_address) return;

        this.model.account.login(
          address.address,
          address.publicKey,
          p2tr_address.address,
          p2tr_address.publicKey,
          []
        );
        this.setWallet(WALLETS.xVerse);
        app.notificationService.showInfo("Success");
      },
    };
    await getAddress(getAddressOptions);
  }

  async ordinalsSafeLogin() {
    const conf = await this.backend.getConf();
    const network = await window.ordinalSafe.getNetwork();

    if (conf.network !== network)
      await window.ordinalSafe.switchNetwork(
        conf.network === "bitcoin" ? "mainnet" : conf.network
      );

    const accs = await window.ordinalSafe.requestAccounts();

    this.model.account.login(accs[0], "", accs[0], "", []);
    this.setWallet(WALLETS.ordinalsSafe);
    app.notificationService.showInfo("Success");
  }

  async transferInscription(
    inscriptionId: string,
    address: string,
    feeRate?: number
  ): Promise<
    | {
        txId: string;
      }
    | undefined
  > {
    if (this.currentWallet === WALLETS.unisat) {
      return await window.unisat.sendInscription(
        address,
        inscriptionId,
        feeRate ? { feeRate: feeRate } : undefined
      );
    }
  }

  async payBitcoin(toAddress: string, amount: number) {
    if (this.currentWallet === WALLETS.unisat) {
      return await window.unisat.sendBitcoin(toAddress, amount);
    }
    if (this.currentWallet === WALLETS.ordinalsSafe) {
      return await window.ordinalSafe.sendBitcoin(toAddress, amount);
    }
    if (this.currentWallet === WALLETS.hiro) {
      return await window.btc.request("sendTransfer", {
        address: toAddress,
        amount: amount,
      });
    }
    if (this.currentWallet === WALLETS.xVerse) {
      if (!this.model.btcData.fees) throw new Error("Fees not loaded");

      const accountAddress = this.model.account.address;
      const publicKey = hex.decode(this.model.account.pub);

      const utxos = await this.world.loadUtxos(accountAddress);
      await this.world.updateBTCFeeRates();
      const utxosToUse = [];
      let availableValue = 0;

      for (const u of utxos.sort((a, b) => b.value - a.value)) {
        availableValue += u.value;
        utxosToUse.push(u);

        if (availableValue >= amount) break;
      }
      const conf = await this.backend.getConf();
      const realTx = getSendBtcTx(
        accountAddress,
        toAddress,
        amount,
        publicKey,
        utxosToUse,
        this.model.btcData.fees.fastestFee,
        conf.network === "bitcoin" ? NETWORK : TEST_NETWORK
      );

      const psbt = realTx.toPSBT(0);
      const psbtB64 = base64.encode(psbt);

      const signPsbtOptions: SignTransactionOptions = {
        payload: {
          network: {
            type:
              conf.network === "bitcoin"
                ? BitcoinNetworkType.Mainnet
                : BitcoinNetworkType.Testnet,
          },
          message: "Sign Transaction",
          psbtBase64: psbtB64,
          broadcast: true,
          inputsToSign: [
            {
              address: accountAddress,
              signingIndexes: [0],
            },
          ],
        },
        onFinish: (response: unknown) => {
          if (
            response &&
            typeof response === "object" &&
            "psbtBase64" in response
          ) {
            // alert(response.psbtBase64);
          }
        },
        onCancel: () => {
          /**/
        },
      };

      await signTransaction(signPsbtOptions);
    }
  }

  private setWallet(wallet: WALLETS) {
    this.currentWallet = wallet;
    this.localData.wallet = {
      wallet,
      address: this.model.account.address,
      key: this.model.account.pub,
      address2: this.model.account.p2trAddress,
      key2: this.model.account.p2tr_pub,
    };
  }
}
