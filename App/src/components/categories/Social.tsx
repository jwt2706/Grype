import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { IoPeople } from "react-icons/io5";

interface SocialProps {
    social: string;
}

/*
* handle the category animations within this component
*/

const Social = (props: SocialProps) => {
    const socialRef = useRef<HTMLDivElement>(null);
    const peopleRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const socialElement = socialRef.current;
        const peopleElement = peopleRef.current;

        if (socialElement && peopleElement) {
            gsap.fromTo(socialElement, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 1 });
            gsap.fromTo(peopleElement, { scale: 0.9 }, { scale: 1.1, duration: 1, yoyo: true, repeat: -1, ease: "bounce.in" });
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-full bg-orange-400">
            <div>
                <div ref={socialRef} className="pb-8">{props.social}</div>
                <div ref={peopleRef} className="flex justify-center items-center">
                    <IoPeople size={148} />
                </div>
            </div>
        </div>
    );
}

export default Social;