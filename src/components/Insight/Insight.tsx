import * as React from "react";
import * as styles from "./Insight.module.sass"
import {InsightData} from "../App/App";
import Content from "../Content/Content";
import Prompt from "../Prompt/Prompt";

type InsightTabProps = {
    insightData: InsightData
    isInsightRequested: boolean,
    isRecordingStarted: boolean,
}

enum Mode {
    "isInitialRecordingInProgress",
    "recordingInProgress",
    "waitingForAssistantResponse",
    "initialInputRequired",
    "onReview",
}

export function Insight({insightData, isInsightRequested, isRecordingStarted}: InsightTabProps)
{
    const getMode = (() => {
        switch(true) {
            case isRecordingStarted && !insightData:
                return Mode.isInitialRecordingInProgress;
            case isRecordingStarted:
                return Mode.recordingInProgress;
            case isInsightRequested:
                return Mode.waitingForAssistantResponse;
            case !insightData:
                return Mode.initialInputRequired;
            default:
                return Mode.onReview;
        }
    });

    const content = new Map([
        [Mode.isInitialRecordingInProgress, (
            <Prompt
                title={"Keep talking..."}
                description={"Your assistant is listening to you and will be glad to help."}
            />
        )],
        [Mode.recordingInProgress, (
            <Content title={insightData?.title} content={insightData?.content}/>
        )],
        [Mode.waitingForAssistantResponse, (
            <Prompt
                title={"Wait a minute..."}
                description={"Your assistant is working on your request, please, wait a bit."}
                isDisplaySpinner={true}
            />
        )],
        [Mode.initialInputRequired, (
            <Prompt
                title={"Welcome!"}
                description={"Click the button below to start working on a new article for your blog."}
            />
        )],
        [Mode.onReview, (
            <Content title={insightData?.title} content={insightData?.content}/>
        )],
    ]);

    return (
        <div className={styles.insight}>{content.get(getMode())}</div>
    );
}
