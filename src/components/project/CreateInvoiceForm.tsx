import { observer } from "mobx-react";
import { useEffect, useState } from "react";
import { app } from "../../contexts/AppContext";
import { FeeRates } from "../../interfaces/btc";
import { ProjectModel } from "../../models/ProjectModel";
import { ICreatedInvoiceParams } from "../../interfaces/projects";

export const CreateInvoiceForm = observer(
  ({ project }: { project: ProjectModel }) => {
    const { model } = app;
    const [selectedFeeRate, setSelectedFeeRate] = useState("fastestFee");
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [params, setParams] = useState<ICreatedInvoiceParams>({
      project_id: project.id,
      mint_amount: project.max_per_mint,
      receiver_address: model.account.logined
        ? model.account.ordinalAddress
        : "",
      trx_speed: "",
    });

    useEffect(() => {
      if (app.model.btcData.fees)
        setParams((p) => ({
          ...p,
          trx_speed:
            app.model.btcData.fees![
              selectedFeeRate as keyof FeeRates
            ].toString(),
        }));
    }, [selectedFeeRate, app.model.btcData.fees]);

    const setValue = <K extends keyof ICreatedInvoiceParams>(
      key: K,
      value: ICreatedInvoiceParams[K]
    ) => {
      setParams((p) => ({ ...p, [key]: value }));
    };

    useEffect(() => {
      app.world.updateBTCFeeRates().catch(console.error);
    }, []);
    useEffect(() => {
      setValue("receiver_address", model.account.ordinalAddress);
    }, [model.account.logined]);

    const canCreateInvoice =
      project.started ||
      (project.activeWhitelistTier &&
        app.model.whitelists.isLoaded(params.receiver_address, project.id) &&
        app.model.whitelists.isWhitelisted(
          params.receiver_address,
          project.id,
          project.activeWhitelistTier.tier
        ));

    if (!app.model.btcData.fees) return <div>loading...</div>;

    return (
      <div
        style={{ padding: "10px", margin: "10px", border: "1px solid black" }}
      >
        {project._id}
        <div>
          <label>
            Mint amount {project.min_per_mint} - {project.max_per_mint}
            <input
              name={"mint_amount"}
              type={"number"}
              min={project.min_per_mint}
              max={project.max_per_mint}
              defaultValue={params.mint_amount}
              onChange={(e) => {
                setValue("mint_amount", parseInt(e.target.value));
              }}
            />
          </label>
        </div>
        <div>
          <label>
            Receiver address
            <input
              name={"address"}
              defaultValue={params.receiver_address}
              onChange={(e) => {
                setValue("receiver_address", e.target.value);
              }}
            />
          </label>
        </div>

        <div>
          Fees:{" "}
          {Object.keys(app.model.btcData.fees).map((feeRate, i) => {
            return (
              <div key={i}>
                <input
                  type="radio"
                  name="feeRate"
                  value={feeRate}
                  checked={selectedFeeRate === feeRate}
                  onChange={() => setSelectedFeeRate(feeRate)}
                />
                {feeRate} {app.model.btcData.fees![feeRate as keyof FeeRates]}{" "}
                sat/byte
              </div>
            );
          })}
        </div>
        <label>
          {project.terms}
          <input
            type={"checkbox"}
            onChange={(e) => setTermsAccepted(e.target.checked)}
          />
        </label>
        <div>
          <button
            onClick={() => {
              if (!params.receiver_address)
                return app.notificationService.showError(
                  "Receiver address is empty"
                );
              if (
                !params.mint_amount ||
                params.mint_amount < project.min_per_mint ||
                params.mint_amount > project.max_per_mint
              )
                return app.notificationService.showError(
                  "Mint amount is invalid"
                );
              if (!params.trx_speed)
                return app.notificationService.showError(
                  "Mint amount is invalid"
                );

              if (canCreateInvoice) app.backend.createInvoice(params);
            }}
            disabled={!termsAccepted || !canCreateInvoice}
          >
            Create invoice
          </button>
          {project.activeWhitelistTier && (
            <div>
              {!app.model.whitelists.isLoaded(
                params.receiver_address,
                project.id
              ) ? (
                <button
                  onClick={() => {
                    if (!params.receiver_address)
                      return app.notificationService.showError(
                        "Receiver address is empty"
                      );
                    app.backend.requestCheckWhitelist(
                      project.id,
                      params.receiver_address
                    );
                  }}
                >
                  check whitelist
                </button>
              ) : canCreateInvoice ? (
                "whitelisted"
              ) : (
                "not whitelisted"
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
