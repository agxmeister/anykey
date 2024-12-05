import * as React from "react";
import * as styles from "./Prompt.module.sass"

type GreetingProps = {
    title: string,
    description: string,
    isDisplaySpinner?: boolean
}

export default function Prompt({title, description, isDisplaySpinner}: GreetingProps)
{
    return (
        <div className={styles.prompt}>
            <div>
                <h1>{title}</h1>
                <p>{description}</p>
                {isDisplaySpinner ? (
                    <div className={styles.spinner}/>
                ) : null}
            </div>
        </div>
    );
}
