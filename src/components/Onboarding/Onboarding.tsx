import * as React from "react";
import {useState} from "react";
import * as styles from "./Onboarding.module.sass"
import classNames from "classnames";
import QqReader from "../QrReader/QrReader";
import {Settings} from "../App/App";

type OnboardingProps = {
    onOnboardingReady: (data: Settings) => void;
}

export default function Onboarding({onOnboardingReady}: OnboardingProps)
{
    const [active, setActive] = useState(false);
    const [settings, setSettings] = useState<Settings>(null);

    const toggleActive = () => {
        setActive(!active);
        if (settings) {
            onOnboardingReady(settings);
        }
    };

    const getLabel = () => {
        switch (true) {
            case !active && !settings:
                return "Start camera";
            case active && !settings:
                return "Stop camera";
            default:
                return "Save and go!";
        }
    };

    const onSettingsReady = (data: Settings) => {
        setSettings(data);
    }

    return (
        <>
            <div
                className={styles.overlay}
                style={{
                    backgroundColor: settings ? "#8cb369" : "#4a5759",
                }}
            />
            <div className={styles.viewport}>
                {active ? (
                    <QqReader
                        onSettingsReady={onSettingsReady}
                    />
                ) : null}
            </div>
            <div
                className={classNames(
                    styles.button,
                    active ? styles.buttonActive : null,
                )}
                onClick={() => toggleActive()}
            >
                {getLabel()}
            </div>
        </>
    );
}
