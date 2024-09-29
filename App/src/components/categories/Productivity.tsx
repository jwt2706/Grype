import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { FaPaperclip } from "react-icons/fa";

interface ProductivityProps {
    productivity: string;
}

/*
* handle the category animations within this component
*/

const Productivity = (props: ProductivityProps) => {
    const productivityRef = useRef<HTMLDivElement>(null);
    const eatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const productivityElement = productivityRef.current;
        const eatElement = eatRef.current;

        if (productivityElement && eatElement) {
            gsap.fromTo(productivityElement, { scale: 0 }, { scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" });

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
        <div className="flex justify-center items-center h-full bg-fuchsia-950  text-white">
            <div>
                <div ref={productivityRef} className="pb-8">{props.productivity}</div>
                <div ref={eatRef} className="flex justify-center items-center">
                    <FaPaperclip size={148} />
                </div>
            </div>
        </div>
    );
}

export default Productivity;
