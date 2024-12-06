import * as React from "react";
import * as styles from "./Settings.module.sass"

type SettingsProps = {
    onClearSettings: () => void
}

export default function Settings({onClearSettings}: SettingsProps)
{
    return (
        <div className={styles.settings}>
            <div className={styles.line}>
                {"WordPress API URL: undefined"}
            </div>
            <div className={styles.line}>
                {"Secret: undefined"}
            </div>
            <div
                className={styles.action}
                onClick={() => onClearSettings()}
            >
                {"Clear settings"}
            </div>
        </div>
    );
}
