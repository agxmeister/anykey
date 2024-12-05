import * as React from "react";
import {useEffect, useRef, useState} from "react";
import classNames from "classnames";
import * as styles from "./VoiceRecorder.module.sass"

type RecorderProps = {
    onUserInputReady: (input: string) => void,
    onToggleRecording: (isRecordingStarted: boolean) => void,
    isAvailable: boolean,
}

export default function VoiceRecorder({onUserInputReady, onToggleRecording, isAvailable}: RecorderProps)
{
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null);
    const [isRecordingStarted, setIsRecordingStarted] = useState(false);
    const [isProcessingStarted, setIsProcessingStarted] = useState(false);
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
            setIsRecordingStarted(true);
            onToggleRecording(true);
            mediaRecorder.start(1000);
        } else {
            setIsProcessingStarted(true);
            mediaRecorder.stop();
        }
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
            onToggleRecording(false);
            setIsRecordingStarted(false);
            setIsProcessingStarted(false);
        }
    };

    const getLabel = () => {
        switch (true) {
            case !isAvailable:
                return "Please, wait";
            case isProcessingStarted:
                return "Processing..."
            case isRecordingStarted:
                return (
                    <div className={styles.indicator}>
                        <div></div>
                        <div></div>
                    </div>
                );
            default:
                return "Start recording";
        }
    }

    return (
        <div className={styles.recorder}>
            <div
                className={classNames(
                    styles.button,
                    isRecordingStarted ? styles.buttonActive : null,
                    !isAvailable || isProcessingStarted ? styles.buttonDisabled : null,
                )}
                onClick={() => isAvailable ? toggleRecording() : null}
            >
                {getLabel()}
            </div>
        </div>
    );
}
