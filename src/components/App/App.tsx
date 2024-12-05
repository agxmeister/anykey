import * as React from "react";
import Chat from "../Chat/Chat";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import QqDetector from "../Qr/Qr";
import * as styles from './App.module.sass';
import {useState} from "react";
import Insight from "../Insight/Insight";

type InsightData = {
    id: string,
    title: string,
    content: string,
    conversation: InsightDataConversationItem[],
}
type InsightDataConversationItem = {
    role: "user" | "assistant",
    message: string,
}

export default function App()
{
    const [insightData, setInsightData] = useState<InsightData>(null);

    const onUserInputReady = (input: string) => {
        startInsight(input).then((insightData) => {
            console.log(insightData)
            setInsightData(insightData);
        });
    };

    const startInsight = async (input: string): Promise<InsightData> => {
        console.log(`Input: ${input}`);
        const response = await fetch(BASE_INSIGHTS_URL + "/api/insights", {
            method: "POST",
            body: JSON.stringify({
                userInput: input
            })
        });
        return await response.json();
    };

    return (
        <div className={styles.app}>
            {insightData ? (
                <Insight title={insightData.title} content={insightData.content}/>
            ) : null}
            <Chat/>
            <VoiceRecorder onUserInputReady={onUserInputReady}/>
            <QqDetector/>
        </div>
    );
}
