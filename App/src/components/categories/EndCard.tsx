import { useEffect, useRef } from "react";
import { FaCrown } from "react-icons/fa";
import { gsap } from 'gsap';

const EndCard = () => {
    const affRef = useRef<HTMLDivElement>(null);
    const writeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (affRef.current && writeRef.current) {
            gsap.fromTo(affRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.inOut" });
            gsap.fromTo(writeRef.current, { scale: 0.9 }, { scale: 1.1, duration: 1, yoyo: true, repeat: -1, ease: "bounce.in" });
        }
    }, []);

    return (
        <div className="flex justify-center items-center h-full bg-slate-900">
            <div>
                <div ref={affRef} className="pb-8 text-2xl text-slate-200">
                    Good Job!!<br />
                    <small>You're all done</small>
                </div>
                <div ref={writeRef} className="flex justify-center items-center text-slate-200">
                    <FaCrown size={148} />
                </div>
            </div>
        </div>
    )
}

export default EndCard;
