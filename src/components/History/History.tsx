import * as React from "react";
import * as styles from "./History.module.sass"
import {InsightDataConversationItem} from "../App/App";
import classNames from "classnames";

type HistoryProps = {
    conversation?: InsightDataConversationItem[]
}

export default function History({conversation}: HistoryProps)
{
    return (
        <div className={styles.history}>
            {conversation ? conversation.map((message) => (
                <div
                    className={classNames(
                        styles.message,
                        message.role === "user" ? styles.user : styles.assistant,
                    )}
                >
                    <span>{message.role === "user" ? "You" : "Assistant"}</span>
                    {message.message}
                </div>
            )).reverse() : null}
        </div>
    );
}
