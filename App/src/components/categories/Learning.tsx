import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaBook } from "react-icons/fa";

interface LearningProps {
    learning: string;
}

/*
* handle the category animations within this component
*/

const Learning = (props: LearningProps) => {
    const learningRef = useRef<HTMLDivElement>(null);
    const eatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const learningElement = learningRef.current;
        const eatElement = eatRef.current;

        if (learningElement && eatElement) {
            gsap.fromTo(learningElement, { scale: 0 }, { scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" });

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
        <div className="flex justify-center items-center h-full bg-pink-500">
            <div>
                <div ref={learningRef} className="pb-8">{props.learning}</div>
                <div ref={eatRef} className="flex justify-center items-center">
                    <FaBook size={148} />
                </div>
            </div>
        </div>
    );
}

export default Learning;
