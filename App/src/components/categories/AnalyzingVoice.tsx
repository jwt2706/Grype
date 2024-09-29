import { useEffect, useRef, useState } from 'react';
import { CONFIG } from '../../config';
import { CategoryList } from '../../types/Categories';
import { AudioRecorder } from '../../services/AudioService';
import { gsap } from 'gsap';

interface AnalyzingVoiceProps {
    setConfigState: (configState: boolean) => void;
}

const AnalyzingVoice = (props: AnalyzingVoiceProps) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [categoryIndex, setCategoryIndex] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);
    const [processing, setProcessing] = useState<boolean>(false);
    const recorder = useRef(new AudioRecorder());

    useEffect(() => {
        gsap.fromTo(".category-text", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
    }, [categoryIndex]);
    
    useEffect(() => {
        gsap.fromTo(".prompt-text", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1 });
    }, []);

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
        <div className="flex justify-center items-center h-full bg-black">
            <div>
                <div className='p-4 pb-5'>
                    <div className='prompt-text'>Please tell me about how this topic affected your day {window.localStorage.getItem("name")}: </div>
                    <div className={`p-4 category-text ${colorOfCategory(CategoryList[categoryIndex])}`}>{CategoryList[categoryIndex]}</div>
                </div>
                <div className='pb-5'>
                <button onClick={() => {
                    if (!recording) startRecording();
                    else stopRecording();
                }}>{processing ? "Processing input!" : recording ? "Currently recording" : "Start Recording"}</button>
                </div>
                <button onClick={() => {
                    localStorage.setItem("config", "");
                    props.setConfigState(false);
                }}>Skip</button>
            </div>
        </div>
    );
};

export default AnalyzingVoice;


const colorOfCategory = (category: string) => {
    switch (category) {
        case "food":
            return "text-orange-200";
        case "exercise":
            return "text-purple-400";
        case "social":
            return "text-orange-200";
        case "water":
            return "text-blue-200";
        default:
            return "text-white";
    }
}
