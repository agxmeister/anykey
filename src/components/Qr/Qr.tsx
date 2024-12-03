import * as React from "react";
import {useState} from "react";
import classNames from "classnames";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import * as styles from "./Qr.module.sass"

export default function QqDetector()
{
    const [active, setActive] = useState(false);
    const [data, setData] = useState("");

    const toggleActive = () => setActive(!active);

    return (
        <div className={styles.qr}>
            <div
                className={classNames(
                    styles.button,
                    active ? styles.buttonActive : null,
                )}
                onClick={() => toggleActive()}
            >{active ? "Turn camera off" : "Turn camera on"}</div>
            {active ? <>
                    <BarcodeScannerComponent
                        width={500}
                        height={500}
                        onUpdate={(err, result) => {
                            if (result) {
                                setData(result.getText());
                            } else {
                                setData("not found");
                            }
                        }}
                    />
                    <div>{data}</div>
                </> : null
            }
            <div>{active ? "true" : "false"}</div>
        </div>
    );
}
