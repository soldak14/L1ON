import { observer } from "mobx-react";
import Styles from "./ProjectsItem.module.scss";
import { Link } from "react-router-dom";
import { getProjectPath } from "../../helpers/page_helper";
import { IWhitelistTier } from "../../interfaces/projects";

type ProjectProps = {
  name: string;
  id: number;
  active: boolean;
  activeWhitelistTier: IWhitelistTier | undefined;
  image: string;
};

export const ProjectsItem = observer(
  ({ name, id, active, activeWhitelistTier, image }: ProjectProps) => {
    return (
      <div className={Styles.block}>
        <Link to={getProjectPath(id)}>
          <img src={image} />
        </Link>
        <h3>
          <Link to={getProjectPath(id)}>{name}</Link>
        </h3>
        <h4>
          {active
            ? "active"
            : activeWhitelistTier
            ? "whitelist active"
            : "not active"}
        </h4>
      </div>
    );
  }
);
