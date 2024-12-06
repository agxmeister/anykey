import * as React from "react";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import QqDetector from "../Qr/Qr";
import * as styles from './App.module.sass';
import {useState} from "react";
import {Insight} from "../Insight/Insight";
import History from "../History/History";
import Tab from "../Tab/Tab";

export type InsightData = {
    id: string,
    title: string,
    content: string,
    conversation: InsightDataConversationItem[],
}

export type InsightDataConversationItem = {
    role: "user" | "assistant",
    message: string,
}

export default function App()
{
    const [insightData, setInsightData] = useState<InsightData>(null);
    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const [isInsightRequested, setIsInsightRequested] = useState(false);

    const onUserInputReady = (input: string) => {
        setIsInsightRequested(true)
        requestInsight(input).then((insightData) => {
            setIsInsightRequested(false)
            setInsightData(insightData);
        });
    };

    const onToggleRecording = (isRecordingStarted: boolean) => {
        setIsRecordingStarted(isRecordingStarted);
    }

    const requestInsight = async (input: string): Promise<InsightData> => {
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
            <>
                <Insight
                    insightData={insightData}
                    isInsightRequested={isInsightRequested}
                    isRecordingStarted={isRecordingStarted}
                />
                <VoiceRecorder
                    onUserInputReady={onUserInputReady}
                    onToggleRecording={onToggleRecording}
                    isAvailable={!isInsightRequested}
                />
            </>
            <Tab
                name={"History"}
                position={0}
                node={
                    <History conversation={insightData ? insightData.conversation : null}/>
                }
            />
            <Tab
                name={"Settings"}
                position={1}
                node={
                    <QqDetector/>
                }
            />
        </div>
    );
}
