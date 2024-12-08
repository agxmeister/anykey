import * as React from "react";
import * as styles from "./Control.module.sass";

type ControlProps = {
    name: string,
    position: number,
    handler: () => void,
}

export default function Control({name, position, handler}: ControlProps)
{
    return (
        <>
            <div
                className={styles.control}
                style={{
                    gridRowStart: position * 4 + 3
                }}
                onClick={() => handler()}
            >
                <div>{name}</div>
            </div>
        </>
    );
}
