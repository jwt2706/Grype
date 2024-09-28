import React, { useEffect } from "react";

interface VerticalCarouselProps {
    slides: React.ReactNode[];

}

const VerticalCarousel = (props: VerticalCarouselProps) => { 
    const [index, setIndex] = React.useState(0);
    const [ onLoad, setOnLoad ] = React.useState(0);

    const currentSlide = props.slides[index];

    console.log(index);

    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "ArrowDown") {
                moveSlide(1);
            }
        });
    }, [onLoad]);

    const moveSlide = (direction: number) => {
        if (index == props.slides.length) {
            // notifiy the user that they have reached the end of the carousel
            console.log("End of carousel");
            return;
        } else {
            setIndex(index + direction);
        }
        setOnLoad(onLoad + 1);
    }


    return (
        <>
            <div className="snap-y snap-mandatory snap-vertical">
                {currentSlide}
            </div>
        </>
    );
}

export default VerticalCarousel;
