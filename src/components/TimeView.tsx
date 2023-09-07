import {observer} from "mobx-react";
import {useEffect, useState} from "react";
import {formatTimeLeft} from "../helpers/date";

export const TimeView = observer(({eventTime}: { eventTime: number }) => {
    const [timeLeft, setTimeLeft] = useState(formatTimeLeft(eventTime));
    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(formatTimeLeft(eventTime));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return <span>{timeLeft}</span>;

});