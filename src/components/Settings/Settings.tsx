import * as React from "react";
import * as styles from "./Settings.module.sass"
import {Settings} from "../App/App";
import classNames from "classnames";

type SettingsProps = {
    settings: Settings
    onClearSettings: () => void
}

export default function Settings({settings, onClearSettings}: SettingsProps)
{
    return (
        <div className={styles.settings}>
            <div className={styles.line}>
                {`Publish URL: ${settings?.publishUrl}`}
            </div>
            <div className={styles.line}>
                {`Secret: ${settings?.secret.replaceAll(/./g, '*')}`}
            </div>
            <div
                className={classNames(
                    styles.action,
                    styles.actionDanger
                )}
                onClick={() => onClearSettings()}
            >
                {"Clear settings"}
            </div>
        </div>
    );
}
