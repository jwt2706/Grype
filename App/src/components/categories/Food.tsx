import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GiChickenLeg } from "react-icons/gi";

interface FoodProps {
    food: string;
}

/*
* handle the category animations within this component
*/

const Food = (props: FoodProps) => {
    const foodRef = useRef<HTMLDivElement>(null);
    const eatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const foodElement = foodRef.current;
        const eatElement = eatRef.current;

        if (foodElement && eatElement) {
            gsap.fromTo(foodElement, { scale: 0 }, { scale: 1, duration: 1, ease: "elastic.out(1, 0.3)" });

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
        <div className="flex justify-center items-center h-full bg-purple-400">
            <div>
                <div ref={foodRef} className="pb-8">{props.food}</div>
                <div ref={eatRef} className="flex justify-center items-center">
                    <GiChickenLeg size={148} />
                </div>
            </div>
        </div>
    );
}

export default Food;