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

enum Tab {
    "insight",
    "chat",
    "settings",
}

export default function App()
{
    const [activeTab, setActiveTab] = useState<Tab>(Tab.insight);

    const [insightData, setInsightData] = useState<InsightData>(null);

    const onUserInputReady = (input: string) => {
        startInsight(input).then((insightData) => {
            setInsightData(insightData);
        });
    };

    const startInsight = async (input: string): Promise<InsightData> => {
        console.log(`Input: ${input}`);
        const url = insightData
            ? BASE_INSIGHTS_URL + "/api/insights/" + insightData.id
            : BASE_INSIGHTS_URL + "/api/insights";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                userInput: input
            })
        });
        return await response.json();
    };

    return (
        <div className={styles.app}>
            {activeTab === Tab.insight ? (
                <>
                    {insightData ? (
                        <Insight title={insightData.title} content={insightData.content}/>
                    ) : null}
                    <VoiceRecorder onUserInputReady={onUserInputReady}/>
                </>
            ) : null}
            {activeTab === Tab.chat ? (
                <Chat/>
            ) : null}
            {activeTab === Tab.settings ? (
                <QqDetector/>
            ) : null}
        </div>
    );
}
