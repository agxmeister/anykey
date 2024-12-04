import * as React from "react";
import Chat from "../Chat/Chat";
import VoiceRecorder from "../VoiceRecorder/VoiceRecorder";
import QqDetector from "../Qr/Qr";
import * as styles from './App.module.sass';
import {useState} from "react";

export default function App()
{
    const onUserInputReady = (input: string) => {
        console.log(`input: ${input}`);
    };
    return (
        <div className={styles.app}>
            <Chat/>
            <VoiceRecorder onUserInputReady={onUserInputReady}/>
            <QqDetector/>
        </div>
    );
}
