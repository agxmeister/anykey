import * as React from "react";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import * as styles from './App.module.sass';
import {useEffect, useState} from "react";
import {Insight} from "../Insight/Insight";
import History from "../History/History";
import Tab from "../Tab/Tab";
import Settings from "../Settings/Settings";
import Onboarding from "../Onboarding/Onboarding";

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
    const [settings, setSettings] = useState(localStorage.getItem("settings"));

    const onOnboardingReady = (settings: string) => {
        localStorage.setItem("settings", settings);
        setSettings(settings);
    }

    const onClearSettings = () => {
        localStorage.setItem("settings", null);
        setSettings(null);
    }

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
            {settings ? (
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
            ) : (
                <Onboarding
                    onOnboardingReady={onOnboardingReady}
                />
            )}
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
                    <Settings onClearSettings={onClearSettings}/>
                }
            />
        </div>
    );
}
