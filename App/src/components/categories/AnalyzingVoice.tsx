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
    const stopRecordingTimeout = useRef(0);

    useEffect(() => {
        gsap.fromTo(".category-text", { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1 });
    }, [categoryIndex]);

    useEffect(() => {
        gsap.fromTo(".prompt-text", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1 });
    }, []);


    function startRecording() {
        setRecording(true)
        try {
            recorder.current.startAudioRecording()
            stopRecordingTimeout.current = setTimeout(() => stopRecording(), CONFIG.VOICE_RECORDING_MAX_DURATION)
        }
        catch (_) {
            setRecording(false)
        }
    }

    function stopRecording() {
        setRecording(false)
        setProcessing(true)
        clearTimeout(stopRecordingTimeout.current);
        recorder.current.finishAudioRecording().then(sentiment => {
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
                    <div className={`p-4 category-text text-2xl capitalize ${colorOfCategory(CategoryList[categoryIndex])}`}>{CategoryList[categoryIndex]}</div>
                </div>
                <div className='pb-5'>
                    <button className={` ${colorOfRecordButton(processing, recording)} `} onClick={() => {
                        if (!recording) startRecording();
                        else stopRecording();
                    }}>{processing ? "Processing input!" : recording ? "Currently recording" : "Start Recording"}</button>
                </div>
                <button onClick={() => {
                    localStorage.setItem("config", "");
                    props.setConfigState(false);
                }}>Skip</button>
                <div className="p-5 text-gray-500 mt-48">
                    Revolutionize your habit tracking with growth stimulating byte sized AI suggestions!
                    <div className="pt-2 text-sm">
                        <a href="https://devpost.com/software/grype" target="_blank" >For more information</a>
                    </div>
                </div>
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

const colorOfRecordButton = (processing: boolean, recording: boolean) => {
    if (processing) {
        return "bg-yellow-300 text-slate-950";
    }

    if (recording) {
        return "bg-red-600";
    }

    return "bg-lime-600";
}
