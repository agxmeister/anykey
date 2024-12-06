import * as React from "react";
import {useState} from "react";
import * as styles from "./Onboarding.module.sass"
import classNames from "classnames";
import QqReader from "../QrReader/QrReader";

type OnboardingProps = {
    onOnboardingReady: (data: string) => void;
}

export default function Onboarding({onOnboardingReady}: OnboardingProps)
{
    const [active, setActive] = useState(false);
    const [data, setData] = useState(null);

    const toggleActive = () => {
        setActive(!active);
        if (data) {
            onOnboardingReady(data);
        }
    };

    const getLabel = () => {
        switch (true) {
            case !active && !data:
                return "Start camera";
            case active && !data:
                return "Stop camera";
            default:
                return "Save and go!";
        }
    };

    const onDataReady = (data: string) => {
        setData(data);
    }

    return (
        <>
            <div
                className={styles.overlay}
                style={{
                    backgroundColor: data ? "#8cb369" : "#4a5759",
                }}
            />
            <div className={styles.viewport}>
                {active ? (
                    <>
                        <QqReader
                            onDataReady={onDataReady}
                        />
                        {data ? <div>{data}</div> : null}
                    </>
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
