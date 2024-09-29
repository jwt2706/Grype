import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaBed } from "react-icons/fa";

interface SleepProps {
    sleep: string;
}

/*
* handle the category animations within this component
*/

const Sleep = (props: SleepProps) => {
    const sleepRef = useRef<HTMLDivElement>(null);
    const eatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sleepElement = sleepRef.current;
        const eatElement = eatRef.current;

        if (sleepElement && eatElement) {
            gsap.fromTo(sleepElement, { scale: 0 }, { scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" });

            const shakeAnimation = () => {
                return gsap.fromTo(eatElement, 
                    { rotation: -10 }, 
                    { rotation: 10, duration: 0.1, yoyo: true, repeat: 2, ease: "power1.inOut" }
                );
            };

            const repeatShake = async () => {
                while (true) {
                    await shakeAnimation().then(() => new Promise(resolve => gsap.delayedCall(1, resolve)));
                }
            };

            repeatShake();
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-full bg-green-300">
            <div>
                <div ref={sleepRef} className="pb-8">{props.sleep}</div>
                <div ref={eatRef} className="flex justify-center items-center">
                    <FaBed size={148} />
                </div>
            </div>
        </div>
    );
}

export default Sleep;
