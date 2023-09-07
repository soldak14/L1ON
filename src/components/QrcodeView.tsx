import QRCode from 'qrcode'
import {observer} from "mobx-react";
import {useEffect, useState} from "react";

export const QrcodeView = observer(({data}: { data: string }) => {
    const [code, setCode] = useState<string>();

    useEffect(() => {
        QRCode.toDataURL(data)
            .then(url => {
                setCode(url)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])
    return <>
        {
            code && <img src={code}/>
        }
    </>;
});