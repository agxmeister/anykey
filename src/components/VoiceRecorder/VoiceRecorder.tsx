import * as React from "react";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import * as styles from "./VoiceRecorder.module.sass"

type RecorderProps = {
    onUserInputReady: Function,
}

export default function VoiceRecorder({onUserInputReady}: RecorderProps)
{
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const recordingBufferRef = useRef<Blob[]>([]);

    useEffect(() => {
        getMediaRecorder();
    }, []);

    const getMediaRecorder = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({
                audio: true,
            })
                .then((stream) => {
                    setMediaRecorder(new MediaRecorder(stream, {
                        mimeType: 'audio/mp4'
                    }));
                })
                .catch((err) => {
                    console.error(`Failed to call MediaDevices:getUserMedia(): ${err}`);
                });
        } else {
            console.error("MediaDevices:getUserMedia() not supported");
        }
    }

    const toggleRecording = () => {
        if (!isRecordingStarted) {
            mediaRecorder.start(1000);
        } else {
            mediaRecorder.stop();
        }
        setIsRecordingStarted(!isRecordingStarted);
    }

    if (!mediaRecorder) {
        return null;
    }

    mediaRecorder.ondataavailable = async (event: BlobEvent) => {
        recordingBufferRef.current.push(event.data);
        if (mediaRecorder.state !== "recording") {
            const blob = new Blob(recordingBufferRef.current, {
                type: "audio/mp4; codecs=opus",
            });
            recordingBufferRef.current = [];

            const response = await fetch(BASE_INSIGHTS_URL + "/api/transcriptions", {
                method: "POST",
                body: blob
            });
            const data = await response.json();
            onUserInputReady(data.message);
        }
    };

    return (
        <div className={styles.recorder}>
            <div
                className={classNames(
                    styles.button,
                    isRecordingStarted ? styles.buttonActive : null,
                )}
                onClick={() => toggleRecording()}
            >
                {isRecordingStarted ? "Stop recording" : "Start recording"}
            </div>
        </div>
    );
}
