import {observer} from "mobx-react";
import {Layout} from "../../components/Layout";
import {app} from "../../contexts/AppContext";
import {Link} from "react-router-dom";
import {getProjectPath} from "../../helpers/page_helper";
import Styles from "./RootPage.module.scss";
import {useEffect} from "react";

export const RootPage = observer(() => {

    useEffect(() => {
        if (!app.model.projects.loaded)
            app.backend.requestProjects();
    }, []);


    if (app.model.projects.items.size === 0) return <Layout>
        loading...
    </Layout>

    return <Layout>
        {app.model.projects.queryAll().map(it => {
            return <div key={it._id} className={Styles.block}>
                <h3><Link to={getProjectPath(it.id)}>{it.name}</Link></h3>
                <h4>{it.active ? "active" : it.activeWhitelistTier ? "whitelist active" : "not active"}</h4>
                <Link to={getProjectPath(it.id)}><img src={it.image}/></Link>
            </div>
        })}
    </Layout>;
});