import {app} from "../contexts/AppContext";

export const AccountView = ({address, p2trAddress}: { address: string, p2trAddress: string }) => {
    return <div>
        <div>{address}</div>
        {p2trAddress && <div>{p2trAddress}</div>}
        <button onClick={()=>app.wallet.logout()}>logout</button>
    </div>;
};