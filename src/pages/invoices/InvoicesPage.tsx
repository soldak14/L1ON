import {observer} from "mobx-react";
import {Layout} from "../../components/Layout";
import {app} from "../../contexts/AppContext";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {getInvoicePath} from "../../helpers/page_helper";

export const InvoicesPage = observer(() => {
    const params = useParams();
    const project_id = params.project_id ? parseInt(params.project_id) : undefined;

    const allInvoices = project_id ? app.model.invoices.queryAll(project_id) : undefined;

    useEffect(() => {
        if (project_id && !app.model.invoices.isLoaded(project_id))
            app.backend.requestInvoices(project_id);
    }, []);

    if (!allInvoices || !project_id || !app.model.invoices.isLoaded(project_id))
        return <Layout> loading... </Layout>

    return <Layout>
        <div>ALL INVOICES</div>
        {allInvoices.map(it => {
            return <div key={it.id}>
                <Link to={getInvoicePath(project_id, it.id)}>#{it.id} {it.amount} {it.status} {it.networkFee} {it.address}</Link>
            </div>
        })}

        {allInvoices.length === 0 && <div>no invoices</div>}
    </Layout>;
});