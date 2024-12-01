import {useState} from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

export default function QqDetector()
{
    const [active, setActive] = useState(false);
    const [data, setData] = useState("");

    const toggleActive = () => setActive(!active);

    return (
        <>
            <button onClick={() => toggleActive()}>{active ? "Turn camera off" : "Turn camera on"}</button>
            {active ? <>
                    <BarcodeScannerComponent
                        width={500}
                        height={500}
                        onUpdate={(err, result) => {
                            if (result) {
                                setData(result.text);
                            } else {
                                setData("not found");
                            }
                        }}
                    />
                    <div>{data}</div>
                </> : null
            }
            <div>{active ? "true" : "false"}</div>
        </>
    );
}
