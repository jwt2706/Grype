import { useState } from 'react';
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

    const recorder = new AudioRecorder();

    function startRecording() {
        recorder.startAudioRecording()

        setTimeout(()=> {
            recorder.finishAudioRecording().then(sentiment => console.log("Sentiment: ", sentiment))
        }, 10*1000)
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
            }}>{recording ? "Currently recording" : "Start Recording"}</button>
            <button onClick={() => {
                localStorage.setItem("config", "");
                props.setConfigState(false);
            }}>Skip</button>
        </div>
    );
};

export default AnalyzingVoice;
