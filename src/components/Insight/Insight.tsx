import * as React from "react";
import * as styles from "./Insights.module.sass"
import {marked} from "marked";
import {useEffect, useState} from "react";

type InsightsProps = {
    title: string,
    content: string,
}

export default function Insight({title, content}: InsightsProps)
{
    const [displayContent, setDisplayContent] = useState(null);
    useEffect(() => {
        onDisplayContent();
    }, [content]);

    const onDisplayContent = async () => {
        setDisplayContent(await marked.parse(content));
    }

    return (
        <div className={styles.insight}>
            <div className={styles.content}>
                <div className={styles.title}>{title}</div>
                {displayContent ? (
                    <div className={styles.markdown} dangerouslySetInnerHTML={{ __html: displayContent }}/>
                ) : null}
            </div>
        </div>
    );
}
