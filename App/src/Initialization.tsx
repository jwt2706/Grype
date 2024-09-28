import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { gsap } from 'gsap';

interface InitializationProps {
    setName: (name: string) => void;
}

const Initialization: React.FC<InitializationProps> = (props) => {
    const [username, setUsername] = useState<string | null>(null);
    const [showNameInput, setShowNameInput] = useState(false);

    useEffect(() => {
        gsap.fromTo(
            ".greeting",
            { opacity: 0, scale: 0 },
            { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
        );
    }, []);

    const [hasClicked, setHasClicked] = useState(false);

    const handleScreenClick = () => {
        if (!hasClicked) {
            gsap.to(".greeting", {
                opacity: 0,
                scale: 0,
                duration: 1,
                ease: "back.in(1.7)",
                onComplete: () => {
                    setShowNameInput(true);
                    gsap.fromTo(
                        ".greeting",
                        { opacity: 0, scale: 0 },
                        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" }
                    );
                },
            });
            setHasClicked(true);
        }
    };


    return (
        <div className="flex justify-center items-center h-[90vh]" onClick={handleScreenClick}>
            {!showNameInput ? (
                <div className="greeting text-white text-4xl">Hi there!</div>
            ) : (
                <div className="text-center greeting">
                    <div className="text-white text-4xl mb-4">What's your name?</div>
                    <div className="mt-20">
                        <TextField
                            sx={{ input: { color: 'white', textAlign: 'center' } }}
                            id="standard-basic"
                            placeholder="someone special <3"
                            variant="standard"
                            onChange={(e) => {
                                setUsername(e.target.value);
                                localStorage.setItem('name', e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <button
                            className={`mt-5 font-bold py-2 px-4 rounded ${username ? 'bg-blue-500 hover:bg-blue-700 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                            onClick={() => {
                                if (username && username.length > 0) {
                                    props.setName(username);
                                }
                            }}
                            disabled={!username}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Initialization;

