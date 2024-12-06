import * as React from "react";
import {ReactNode, useState} from "react";
import * as styles from "./Tab.module.sass";

type TapProps = {
    name: string,
    position: number,
    node: ReactNode,
}

export default function Tab({name, position, node}: TapProps)
{
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div
                className={styles.bookmark}
                style={{
                    gridRowStart: position * 4 + 3
                }}
                onClick={() => toggleIsOpen()}
            >
                <div>{name}</div>
            </div>
            {isOpen ? (
                <div className={styles.tab}>
                    <div className={styles.controls}>
                        <div
                            className={styles.close}
                            onClick={() => toggleIsOpen()}
                        >
                            {`Close ${name}`}
                        </div>
                    </div>
                    {node}
                </div>
            ) : null}
        </>
    );
}
