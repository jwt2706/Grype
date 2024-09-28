import { useState } from 'react';
import { CONFIG } from '../../config';
import { CategoryList } from '../../types/Categories';

interface AnalyzingVoiceProps {
    setConfigState: (configState: boolean) => void;
}

const AnalyzingVoice = (props: AnalyzingVoiceProps) => {
    const [recording, setRecording] = useState<boolean>(false);
    const [categoryIndex, setCategoryIndex] = useState<number>(0);
    const [done, setDone] = useState<boolean>(false);

    function startRecording() {
        if (done) return;
        setRecording(true);

        try {

            // TS is just wrong (except on firefox). Also var is used because we want to hoiste out of the try
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-var
            var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
            recognition.lang = 'en-US';
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_) {
            alert("Browser not supported");
            setRecording(false);

            return;
        }

        recognition.onresult = async (event: any) => {
            const transcript = event.results[0][0].transcript;
            console.log(transcript)

            try {

                const response = await fetch(`${CONFIG.BACKEND_HOST}/analyze`, {
                    method: "POST",
                    body: JSON.stringify({ text: transcript })
                })

                const sentiment: number = (await response.json()).goal_status;

                console.log(CategoryList[categoryIndex], sentiment)
                if (categoryIndex == CategoryList.length - 1) {
                    setDone(true);
                    return;
                }

                setCategoryIndex(categoryIndex + 1);

            } catch (e) {
                console.error(e);

                setRecording(false);
            }
        }

        recognition.onend = () =>{
            setRecording(false);
        }

        recognition.start();
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
        </div>
    );
};

export default AnalyzingVoice;
