import * as React from "react";
import * as styles from "./Prompt.module.sass"
import classNames from "classnames";

type GreetingProps = {
    title: string,
    description: string,
    style?: "dark"|"light",
    isDisplaySpinner?: boolean
}

export default function Prompt({title, description, style = "dark", isDisplaySpinner}: GreetingProps)
{
    return (
        <div className={classNames(
            styles.prompt,
            style === "dark" ? styles.promptDark : styles.promptLight,
        )}>
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
