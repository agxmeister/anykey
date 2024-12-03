import * as React from "react";
import Chat from "../Chat/Chat";
import Recorder from "../Recorder/Recorder";
import QqDetector from "../Qr/Qr";
import * as styles from './App.module.sass';

export default function App()
{
    return (
        <div className={styles.app}>
            <Chat/>
            <Recorder/>
            <QqDetector/>
        </div>
    );
}
