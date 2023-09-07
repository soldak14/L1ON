import {observer} from "mobx-react";
import {ProjectModel} from "../../models/ProjectModel";
import {TimeView} from "../TimeView";

export const ProjectTimeView = observer(({project}: { project: ProjectModel }) => {
    const timeLeft = project.getNearestEventTime;

    if (!project.started) {
        if (project.haveWhitelist) {
            const activeWhitelist = project.activeWhitelistTier;
            if (activeWhitelist)
                return <div>Whitelist tier #{project.activeWhitelistTier.tier} is active. End at: {<TimeView
                    eventTime={timeLeft}/>}</div>;

            return <div>Whitelist will be active at: {<TimeView eventTime={timeLeft}/>}</div>;
        }

    }

    return <div>{project.started ? "Ends in" : "Starts in"} {<TimeView eventTime={timeLeft}/>}</div>;
});