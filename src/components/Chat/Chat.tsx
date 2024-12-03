import * as React from "react";
import {useEffect, useState} from "react";
import * as styles from "./Chat.module.sass"

export default function Chat()
{
    const [data, setData] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(BASE_INSIGHTS_URL + "/api/test");
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return (
        <div className={styles.chat}>The chat is here: {data?.message ?? "loading"}</div>
    );
}
