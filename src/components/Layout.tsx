import {ReactNode} from "react";
import {Header} from "./header/Header";

export const Layout = ({children}: { children?: ReactNode }) => (
    <div>
        <Header/>
        <div/>
        <div>
            {children}
        </div>
    </div>
);

