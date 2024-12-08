import * as React from "react";
import * as styles from "./Content.module.sass"
import {marked} from "marked";
import {useEffect, useState} from "react";

type InsightsProps = {
    title: string,
    content: string,
}

export default function Content({title, content}: InsightsProps)
{
    const [displayContent, setDisplayContent] = useState(null);
    useEffect(() => {
        onDisplayContent();
    }, [content]);

    const onDisplayContent = async () => {
        setDisplayContent(await marked.parse(content));
    }

    return (
        <div className={styles.content}>
            <div className={styles.title}>
                {title
                    ? title
                    : <span className={styles.empty}>{"To be defined..."}</span>
                }
            </div>
            <div className={styles.content}>
                {content
                    ? displayContent ? (
                        <div className={styles.markdown} dangerouslySetInnerHTML={{__html: displayContent}}/>
                    ) : null
                    : <span className={styles.empty}>{"Continue to explain yourself, do not stop! :-) The content will be updated as you go."}</span>
                }
            </div>
        </div>
    );
}
