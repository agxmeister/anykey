import {useEffect, useState} from "react";

export default function Recorder()
{
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [recording, setRecording] = useState(false);
    const [chunks, setChunks] = useState([]);
    const [recordingUrl, setRecordingUrl] = useState(null);

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
                    const mediaRecorder = new MediaRecorder(stream);
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
            mediaRecorder.start(1000);
        } else {
            mediaRecorder.stop();
        }
        setRecording(!recording);
    }

    if (mediaRecorder) {
        mediaRecorder.ondataavailable = (event) => {
            chunks.push(event.data);
            console.log(`Incoming chunk, total length ${chunks.length}`);
            if (!recording) {
                console.log("Recording is done, process it...");
                const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
                setRecordingUrl(window.URL.createObjectURL(blob));
                setChunks([]);
            }
        };
    }

    return (
        <div>
            {mediaRecorder ? (
                <div>
                    <button onClick={() => toggleRecording()}>{recording ? "Stop recording" : "Start recording"}</button>
                </div>
            ) : null}
            {recordingUrl ? (
                <div>
                    <audio controls src={recordingUrl}/>
                </div>
            ) : null}
        </div>
    );
}
