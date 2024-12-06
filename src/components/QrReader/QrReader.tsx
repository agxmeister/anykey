import * as React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import Ajv from "ajv";
import {Settings} from "../App/App";

type QrReaderProps = {
    onSettingsReady: (data: Settings) => void
}

export default function QqReader({onSettingsReady}: QrReaderProps)
{
    return (
        <BarcodeScannerComponent
            width={"100%"}
            height={"100%"}
            onUpdate={(_, result) => {
                if (!result) {
                    return;
                }
                try {
                    const data = JSON.parse(result.getText());

                    const ajv = new Ajv();
                    const schema = {
                        "type": "object",
                        "properties": {
                            "url": { "type": "string" },
                            "secret": { "type": "string" }
                        },
                        "required": ["url", "secret"],
                        "additionalProperties": false,
                    }
                    const getIsValid = ajv.compile<Settings>(schema);

                    if (!getIsValid(data)) {
                        return;
                    }

                    onSettingsReady({
                        ...data
                    });
                } catch (error) {
                }
            }}
        />
    );
}
