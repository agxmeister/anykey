import * as React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

type QrReaderProps = {
    onDataReady: (data: string) => void
}

export default function QqReader({onDataReady}: QrReaderProps)
{
    return (
        <BarcodeScannerComponent
            width={"100%"}
            height={"100%"}
            onUpdate={(err, result) => {
                if (result) {
                    onDataReady(result.getText());
                }
            }}
        />
    );
}
