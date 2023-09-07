import {observer} from "mobx-react";
import {Layout} from "../../components/Layout";
import {app} from "../../contexts/AppContext";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import Styles from "./InvoicePage.module.scss";
import {L} from "../../l10n/L10n";
import {TimeView} from "../../components/TimeView";
import {QrcodeView} from "../../components/QrcodeView";

export const InvoicePage = observer(() => {
    const params = useParams();
    const project_id = params.project_id ? parseInt(params.project_id) : undefined;
    const invoice_id = params.invoice_id ? parseInt(params.invoice_id) : undefined;

    const invoice = invoice_id && project_id ?
        app.model.invoices.getById(project_id, invoice_id) : undefined;

    const project = project_id ? app.model.projects.getById(project_id) : undefined;

    useEffect(() => {
        if (project_id) {
            if (!app.model.invoices.isLoaded(project_id))
                app.backend.requestInvoices(project_id);

            if (!project)
                app.backend.requestProject(project_id);

            app.world.updateBTCFeeRates().catch(console.error)
        }
    }, []);

    if (!invoice || !project || !app.model.invoices.isLoaded(project.id)) return <Layout> loading... </Layout>

    return <Layout>
        <div>
            <h2>Invoice #{invoice.id}</h2>
            <h4>Receiver: {invoice.receiver}</h4>

            {invoice.needPayment && app.model.account.logined && invoice.receiver === app.model.account.ordinalAddress &&
                <>
                    <QrcodeView data={invoice.address}/>
                    <button onClick={() => app.wallet.payBitcoin(invoice.address, invoice.totalPrice)}>
                        pay with wallet
                    </button>
                </>
            }
            <hr/>
            {invoice.failed ? <>
                    {(L.invoice.status as any)[invoice.status]}
                </> :
                <div>{project.statuses.map((it) => {
                    return <div key={it.toString()} className={invoice.status === it ? Styles.status_current_row : Styles.status_row}>
                        {(L.invoice.status as any)[it]} {invoice.needPayment && it === 100 &&
                        <TimeView eventTime={invoice.validUntil}/>}
                    </div>
                })}</div>
            }


        </div>
    </Layout>;
});