import * as React from "react";
import * as styles from "./InsightTab.module.sass"
import {InsightData} from "../App/App";
import Insight from "../Insight/Insight";
import Prompt from "../Prompt/Prompt";

type InsightTabProps = {
    insightData: InsightData
    isInsightRequested: boolean,
    isRecordingStarted: boolean,
}

enum Mode {
    "recodingInProgress",
    "waitingForAssistantResponse",
    "initialInputRequired",
    "onReview",
}

export function InsightTab({insightData, isInsightRequested, isRecordingStarted}: InsightTabProps)
{
    const getMode = (() => {
        switch(true) {
            case isRecordingStarted:
                return Mode.recodingInProgress;
            case isInsightRequested:
                return Mode.waitingForAssistantResponse;
            case !insightData:
                return Mode.initialInputRequired;
            default:
                return Mode.onReview;
        }
    });

    const content = new Map([
        [Mode.recodingInProgress, (
            <Prompt
                title={"Keep talking..."}
                description={"Your assistant is listening to you and will be glad to help."}
            />
        )],
        [Mode.waitingForAssistantResponse, (
            <Prompt
                title={"Wait a minute..."}
                description={"Your assistant is working on your request, please, wait a bit."}
                isDisplaySpinner={true}
            />
        )],
        [Mode.initialInputRequired, (
            <Prompt title={"Welcome!"} description={"Explain your insight to start."}/>
        )],
        [Mode.onReview, (
            <Insight title={insightData?.title} content={insightData?.content}/>
        )],
    ]);

    return (
        <div className={styles.insightTab}>{content.get(getMode())}</div>
    );
}
