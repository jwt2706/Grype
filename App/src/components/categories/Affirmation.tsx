interface AffirmationProps {
    affirmation: string;
}

/*
* handle the category animations within this component
* use GASP
*/

const Affirmation = (props: AffirmationProps) => {
    const affRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const affRef;

        if (waterElement && drinkElement) {
            gsap.fromTo(waterElement, { y: -50, opacity: 0 }, { y: 0, opacity: 1, duration: 1 });
            gsap.fromTo(drinkElement, { rotation: -10 }, { rotation: 10, duration: 0.5, yoyo: true, repeat: -1, ease: "power2.inOut"  });
        }
    }, []);
    return (
        <div className="flex justify-center items-center h-full bg-white">
            <div ref={affRef}>
                {props.affirmation}
            </div>
        </div>
    );
}

export default Affirmation;