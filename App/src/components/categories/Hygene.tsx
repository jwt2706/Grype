import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaSoap } from "react-icons/fa";

interface HygeneProps {
    hygene: string;
}

/*
* handle the category animations within this component
*/

const Hygene = (props: HygeneProps) => {
    const hygeneRef = useRef<HTMLDivElement>(null);
    const eatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const hygeneElement = hygeneRef.current;
        const eatElement = eatRef.current;

        if (hygeneElement && eatElement) {
            gsap.fromTo(hygeneElement, { scale: 0 }, { scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" });

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
        <div className="flex justify-center items-center h-full bg-lime-200">
            <div>
                <div ref={hygeneRef} className="pb-8">{props.hygene}</div>
                <div ref={eatRef} className="flex justify-center items-center">
                    <FaSoap size={148} />
                </div>
            </div>
        </div>
    );
}

export default Hygene;
