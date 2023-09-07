import {observer} from "mobx-react";
import {ProjectModel} from "../../../models/ProjectModel";

export const Brc20 = observer(({project}: { project: ProjectModel }) => {

    return <>
        <div> Brc20</div>
        <div> {project.name} </div>
    </>;
});