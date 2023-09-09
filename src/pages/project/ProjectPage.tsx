import {observer} from "mobx-react";
import {Layout} from "../../components/layout/Layout";
import {app} from "../../contexts/AppContext";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {CreateInvoiceForm} from "../../components/project/CreateInvoiceForm";
import {getInvoicePath, getInvoicesPath} from "../../helpers/page_helper";
import {ProjectTimeView} from "../../components/project/ProjectTimeView";
import {formatTimeAgo} from "../../helpers/date";
import {Brc20} from "../../components/project/mint_types/Brc20";
import {Html} from "../../components/project/mint_types/Html";

export const ProjectPage = observer(() => {
    const params = useParams();
    const project_id = params.id;
    const project = project_id ? app.model.projects.getById(parseInt(project_id)) : undefined;
    const myInvoices = project ? app.model.user_invoices.queryAll(project.id) : undefined;

    useEffect(() => {
        if (!project && project_id)
            app.backend.requestProject(parseInt(project_id));
    }, []);

    useEffect(() => {
        if (project && app.model.account.logined) {
            if (!app.model.user_invoices.isLoaded(project.id))
                app.backend.requestUserInvoices(project.id, app.model.account.ordinalAddress);

            if (!app.model.whitelists.isLoaded(app.model.account.ordinalAddress, project.id))
                app.backend.requestCheckWhitelist(project.id, app.model.account.ordinalAddress);
        }
    }, [app.model.account.logined, project]);


    if (!project) return <Layout>
        loading...
    </Layout>

    return <Layout>
        {project.isBrc20 && <Brc20 project={project}/>}
        {project.isHtml && <Html project={project}/>}
        <div>{project.ended && `Project is ended ${formatTimeAgo(project.endTime)}`}</div>
        {
            !project.ended && (project.started || project.activeWhitelistTier !== undefined) &&
            <CreateInvoiceForm project={project}/>
        }

        {(!project.ended) && <ProjectTimeView project={project}/>}
        {project && app.model.account.logined &&
            <>
                {
                    app.model.user_invoices.isLoaded(project.id) && myInvoices ?
                        <>
                            <div>MY INVOICES</div>
                            {
                                myInvoices.map(it => {
                                    return <div key={it.id}>
                                        <div>
                                            <Link
                                                to={getInvoicePath(project.id, it.id)}>#{it.id} {it.amount} {it.status} {it.address}</Link>
                                        </div>
                                        <div>Price: {it.totalPrice}, Fee rate: {it.feeRate}</div>
                                        {it.needPayment &&
                                            <button onClick={() => app.wallet.payBitcoin(it.address, it.totalPrice)}>pay
                                                with
                                                wallet</button>}
                                    </div>
                                })
                            }
                        </> : <>loading invoices...</>
                }
            </>
        }
        <Link to={getInvoicesPath(project.id)}>All invoices</Link>
    </Layout>;
});