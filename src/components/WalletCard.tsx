import {ReactNode} from "react";

export const WalletCard = ({title, onLogin, href, isInstall, icon}: {
    title: string,
    onLogin: () => void,
    href: string,
    isInstall: boolean,
    icon?: ReactNode,
}) => {
    return (
        <div>
            <span>
                {icon}
                {title}
            </span>
            {isInstall
                ? <button onClick={onLogin}>
                    connect
                </button>
                : <a href={href}>install</a>
            }
        </div>
    );
};