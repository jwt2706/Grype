import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '../../config';
import { CategoryList } from '../../types/Categories';
import { AudioRecorder } from '../../services/AudioService';

interface AnalyzingVoiceProps {
    setConfigState: (configState: boolean) => void;
}

const AnalyzingVoice = (props: AnalyzingVoiceProps) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [categoryIndex, setCategoryIndex] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const recorder = useRef(new AudioRecorder());

    let stopRecordingTimeout;

    function startRecording() {
        setRecording(true)
        try {
            recorder.current.startAudioRecording()
            stopRecordingTimeout = setTimeout(() => stopRecording(), CONFIG.VOICE_RECORDING_MAX_DURATION)
        }
        catch (_) {
            setRecording(false)
        }
    }

    function stopRecording() {
        setRecording(false)
        setProcessing(true)
        clearTimeout(stopRecordingTimeout);
        recorder.current.finishAudioRecording().then(sentiment => {
            console.log("Sentiment: ", sentiment)
            alert("Voice processing complete, sentiment: " + (sentiment == 1 ? "Positive" : "Negative"));

            setProcessing(false)

            if (categoryIndex != CategoryList.length - 1) {
                setCategoryIndex(categoryIndex + 1)
            } else {
                setDone(true);
            }
        })
    }

    if (done) {
        return (
            <div>
                <h1>You're done for the day!</h1>
            </div>
        )
    }


    return (
        <div>
            <h1>Please tell me about how this topic affected your day {window.localStorage.getItem("name")}: </h1>
            <p>{CategoryList[categoryIndex]}</p>
            <button onClick={() => {
                if (!recording) startRecording();
                else stopRecording();
            }}>{processing ? "Processing input!" : recording ? "Currently recording" : "Start Recording"}</button>
            <button onClick={() => {
                localStorage.setItem("config", "");
                props.setConfigState(false);
            }}>Skip</button>
        </div>
    );
};

export default AnalyzingVoice;
