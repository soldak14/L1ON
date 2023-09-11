import { observer } from "mobx-react";
import { Layout } from "../../components/layout/Layout";
import { app } from "../../contexts/AppContext";
import Styles from "./RootPage.module.scss";
import { useEffect } from "react";
import { Banner } from "../../components/banner/Banner";
import { ProjectsItem } from "../../components/projectsItem/ProjectsItem";
import { Loader } from "../../ui/loader/Loader";

export const RootPage = observer(() => {
  useEffect(() => {
    if (!app.model.projects.loaded) app.backend.requestProjects();
  }, []);

  if (!app.model.projects.loaded) return <Layout><Loader/></Layout>;

  return (
    <Layout>
      <div className={Styles.wrapper}>
        <Banner />
        <div className={Styles.list}>
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
            );
          })}
        </div>
      </div>
    </Layout>
  );
});
