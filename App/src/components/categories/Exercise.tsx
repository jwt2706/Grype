import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { GiWeightLiftingUp } from "react-icons/gi";

interface ExerciseProps {
    exercise: string;
}

/*
* handle the category animations within this component
*/


const Exercise = (props: ExerciseProps) => {
    const personRef = useRef<HTMLDivElement>(null);
    const exerciseRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const personElement = personRef.current;
        const exerciseElement = exerciseRef.current;

        if (personElement && exerciseElement) {
            gsap.fromTo(personElement, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
            gsap.fromTo(exerciseElement, { y: -10 }, { y: 10, duration: 0.7, yoyo: true, repeat: -1, ease: "bounce.out" });
        }
    }, []);


    return (
        <div className="flex flex-col justify-center items-center h-full bg-purple-400">
            <div ref={personRef} className="pb-8">{props.exercise}</div>
            <div ref={exerciseRef} className="flex justify-center items-center">
                <GiWeightLiftingUp size={148} />
            </div>
        </div>
    );
}

export default Exercise;