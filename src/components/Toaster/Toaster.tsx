import * as React from "react";
import * as styles from "./Toaster.module.sass";
import {InsightDataConversationItem} from "../App/App";

type ToasterProps = {
    content?: InsightDataConversationItem
}

export default function Toaster({content}: ToasterProps)
{
    return (
        <div className={styles.toaster}>
            <div className={styles.content}>{content?.message}</div>
        </div>
    );
}
