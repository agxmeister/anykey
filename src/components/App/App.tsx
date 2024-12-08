import * as React from "react";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import * as styles from './App.module.sass';
import {useState} from "react";
import {Insight} from "../Insight/Insight";
import History from "../History/History";
import Tab from "../Tab/Tab";
import Settings from "../Settings/Settings";
import Onboarding from "../Onboarding/Onboarding";
import Control from "../Control/Control";

export type Settings = {
    publishUrl: string,
    secret: string,
}

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
    const [insightData, setInsightData] = useState<InsightData>(JSON.parse(localStorage.getItem("insightData")));
    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const [isInsightRequested, setIsInsightRequested] = useState(false);
    const [settings, setSettings] = useState<Settings>(JSON.parse(localStorage.getItem("settings")));

    const onOnboardingReady = (settings: Settings) => {
        localStorage.setItem("settings", JSON.stringify(settings));
        setSettings(settings);
    }

    const onClearSettings = () => {
        localStorage.setItem("settings", null);
        setSettings(null);
    }

    const onNew = () => {
        localStorage.setItem("insightData", null);
        setInsightData(null);
    }

    const onUserInputReady = (input: string) => {
        setIsInsightRequested(true)
        requestInsight(input).then((updatedInsightData) => {
            setIsInsightRequested(false);
            updateInsightData({
                ...updatedInsightData,
                ...{
                    title: getLatestMeaningful(updatedInsightData.title, insightData?.title),
                    content: getLatestMeaningful(updatedInsightData.content, insightData?.content),
                }
            });
        });
    };

    const updateInsightData = (insightData: InsightData) => {
        localStorage.setItem("insightData", JSON.stringify(insightData));
        setInsightData(insightData);
    }

    const getLatestMeaningful = (newValue: string, oldValue: string|null): string => {
        if (!newValue && oldValue) {
            return oldValue
        }
        return newValue
    }

    const onToggleRecording = (isRecordingStarted: boolean) => {
        setIsRecordingStarted(isRecordingStarted);
    }

    const requestInsight = async (input: string): Promise<InsightData> => {
        const url = insightData
            ? BASE_INSIGHTS_URL + "/api/insights/" + insightData.id
            : BASE_INSIGHTS_URL + "/api/insights";
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify({
                settings: settings,
                userInput: input,
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
                    <Settings settings={settings} onClearSettings={onClearSettings}/>
                }
            />
            <Control name={"Start New"} position={0} handler={onNew}/>
        </div>
    );
}
