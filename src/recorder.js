import {useEffect, useState} from "react";
import * as styles from "./recorder.module.sass"
import classNames from "classnames";

export default function Recorder()
{
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const [chunks, setChunks] = useState([]);
    const [recordingUrl, setRecordingUrl] = useState(null);
    const [transcription, setTranscription] = useState(null);

    useEffect(() => {
        getMediaRecorder();
    }, []);

    const getMediaRecorder = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices.getUserMedia({
                audio: true,
            })
                .then((stream) => {
                    const mediaRecorder = new MediaRecorder(stream, {
                        mimeType: 'audio/mp4'
                    });
                    setMediaRecorder(mediaRecorder);
                    console.log("Media recorder successfully created.")
                })
                .catch((err) => {
                    console.error(`The following getUserMedia error occurred: ${err}`);
                });
        } else {
            console.log("getUserMedia not supported on your browser!");
        }
    }

    const toggleRecording = () => {
        if (!recording) {
            //mediaRecorder.start(1000);
        } else {
            //mediaRecorder.stop();
        }
        setRecording(!recording);
    }

    if (mediaRecorder) {
        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
            console.log(`Incoming chunk, total length ${chunks.length}`);
            if (!recording) {
                console.log("Recording is done, process it...");
                const blob = new Blob(chunks, { type: "audio/mp4; codecs=opus" });

                fetch('https://moneypenny.agxmeister.services/api/test', {
                    method: "POST",
                    body: blob
                })
                    .then(response => {
                        console.log("Recording was uploaded.");
                        response.json().then(data => {
                            console.log("Transcription is ready.");
                            setTranscription(data.message);
                        });
                    })
                    .catch(error => console.log(error));

                setRecordingUrl(window.URL.createObjectURL(blob));
                setChunks([]);
            }
        };
    }

    return (
        <div className={styles.recorder}>
            {mediaRecorder ? (
                <div
                    className={classNames(
                        styles.button,
                        recording ? styles.buttonActive : null,
                    )}
                    onClick={() => toggleRecording()}
                >
                    {recording ? "Stop recording" : "Start recording"}
                </div>
            ) : null}
            {recordingUrl ? (
                <div>
                    <audio controls src={recordingUrl}/>
                </div>
            ) : null}
            {transcription ? (
                <div>{transcription}</div>
            ) : null}
        </div>
    );
}
