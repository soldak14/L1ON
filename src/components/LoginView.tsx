import {observer} from "mobx-react";
import {LoginPopup} from "./loginPopup/LoginPopup";
import {AccountView} from "./AccountView";
import {useEffect, useState} from "react";
import {app} from "../contexts/AppContext";
import { Button } from "../ui/button/Button";

export const LoginView = observer(() => {
    const {model} = app;
    const [loginState, setLoginState] = useState(false);

    useEffect(() => {
        app.wallet.restoreLogin();
    }, []);

    return <>
        {
            model.account.logined
                ? <AccountView
                    address={model.account.address}
                    p2trAddress={model.account.p2trAddress}/>
                : <>
                    {!loginState && <Button onClick={() => {
                        setLoginState(true)
                    }}>
                        Connect wallet
                    </Button>}
                </>
        }
        {
            loginState && <LoginPopup
                complete={() => setLoginState(false)}
            />
        }
    </>;
});