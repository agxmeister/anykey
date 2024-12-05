import * as React from "react";
import * as styles from "./History.module.sass"
import {useState} from "react";
import {InsightDataConversationItem} from "../App/App";
import classNames from "classnames";

type BookmarkProps = {
    conversation?: InsightDataConversationItem[]
}

export default function History({conversation}: BookmarkProps)
{
    const [isOpen, setIsOpen] = useState(false);

    const toggleIsOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {isOpen ? (
                <div
                    className={styles.tab}
                    onClick={() => toggleIsOpen()}
                >
                    {conversation ? conversation.reverse().map((message) => (
                        <div
                            className={classNames(
                                styles.message,
                                message.role === "user" ? styles.user : styles.assistant,
                            )}
                        >
                            <span>{message.role === "user" ? "You" : "Assistant"}</span>
                            {message.message}
                        </div>
                    )) : null}
                </div>
            ) : (
                <div
                    className={styles.bookmark}
                    onClick={() => toggleIsOpen()}
                >
                    <div>History</div>
                </div>
            )}
        </>
    );
}
