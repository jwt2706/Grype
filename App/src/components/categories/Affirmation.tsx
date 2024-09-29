import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { FaRegHeart } from 'react-icons/fa';

interface AffirmationProps {
    affirmation: string;
}

/*
* handle the category animations within this component
* use GASP
*/

const Affirmation = (props: AffirmationProps) => {
        const affRef = useRef<HTMLDivElement>(null);
        const writeRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            if (affRef.current && writeRef.current) {
                gsap.fromTo(affRef.current, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" });
                gsap.fromTo(writeRef.current, { scale: 0.9 }, { scale: 1.1, duration: 1, yoyo: true, repeat: -1, ease: "bounce.in" });
            }
        }, []);

        return (
            <div className="flex justify-center items-center h-full bg-white">
                <div>
                    <div ref={affRef} className="pb-8">{props.affirmation}</div>
                    <div ref={writeRef} className="flex justify-center items-center">
                        <FaRegHeart size={148} />
                    </div>
                </div>
            </div>
        );
    }

export default Affirmation;