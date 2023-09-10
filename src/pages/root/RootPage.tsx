import { observer } from "mobx-react";
import { Layout } from "../../components/layout/Layout";
import { app } from "../../contexts/AppContext";
// import { Link } from "react-router-dom";
// import { getProjectPath } from "../../helpers/page_helper";
import Styles from "./RootPage.module.scss";
import { useEffect } from "react";
import { Banner } from "../../components/banner/Banner";
import { ProjectsItem } from "../../components/projectsItem/ProjectsItem";

export const RootPage = observer(() => {
  useEffect(() => {
    if (!app.model.projects.loaded) app.backend.requestProjects();
  }, []);

  if (!app.model.projects.loaded) return <Layout>loading...</Layout>;

  return (
    <Layout>
      <div className={Styles.wrapper}>
        <Banner />
        {app.model.projects.queryAll().map((it) => {
          return (
            <ProjectsItem
              key={it._id}
              name={it.name}
              id={it.id}
              activeWhitelistTier={it.activeWhitelistTier}
              image={it.image}
              active={it.active}
            />
            // <div key={it._id} className={Styles.block}>
            //   <h3>
            //     <Link to={getProjectPath(it.id)}>{it.name}</Link>
            //   </h3>
            //   <h4>
            //     {it.active
            //       ? "active"
            //       : it.activeWhitelistTier
            //       ? "whitelist active"
            //       : "not active"}
            //   </h4>
            //   <Link to={getProjectPath(it.id)}>
            //     <img src={it.image} />
            //   </Link>
            // </div>
          );
        })}
      </div>
    </Layout>
  );
});
