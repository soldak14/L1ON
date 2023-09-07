import {observer} from "mobx-react";
import {ProjectModel} from "../../../models/ProjectModel";

export const Html = observer(({project}: { project: ProjectModel }) => {
    return <>
        <div> HTML</div>
        <div> {project.name} </div>
        <iframe srcDoc={project.projectType.data_str}/>
    </>;
});