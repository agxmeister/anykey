import * as React from "react";
import * as styles from "./Insights.module.sass"

type InsightsProps = {
    title: string,
    content: string,
}

export default function Insight({title, content}: InsightsProps)
{
    return (
        <div className={styles.insight}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>{content}</div>
        </div>
    );
}
