import {ReactNode} from "react";
import {Header} from "../header/Header";
import Styles from "./Layout.module.scss"

export const Layout = ({children}: { children?: ReactNode }) => (
    <div className={Styles.layout}>
        <Header/>
        <div/>
        <div>
            {children}
        </div>
    </div>
);

