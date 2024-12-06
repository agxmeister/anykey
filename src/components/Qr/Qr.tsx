import * as React from "react";
import {useState} from "react";
import classNames from "classnames";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import * as styles from "./Qr.module.sass"

export default function QqDetector()
{
    const [active, setActive] = useState(false);
    const [data, setData] = useState(null);

    const toggleActive = () => setActive(!active);

    return (
        <div className={styles.qr}>
            <div className={styles.line}>
                {"WordPress API URL: undefined"}
            </div>
            <div className={styles.line}>
                {"Secret: undefined"}
            </div>
            <div
                className={styles.action}
                onClick={() => toggleActive()}
            >
                {active ? "Cancel" : "Scan settings"}
            </div>
            {active ? (
                <>
                    <BarcodeScannerComponent
                        width={700}
                        height={700}
                        onUpdate={(err, result) => {
                            if (result) {
                                setData(result.getText());
                            }
                        }}
                    />
                    {data ? <div>{data}</div> : null}
                </>
            ) : null}
        </div>
    );
}
