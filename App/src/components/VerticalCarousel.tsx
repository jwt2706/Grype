import React from "react";

interface VerticalCarouselProps {
    slides: React.ReactNode[];

}

const VerticalCarousel = (props: VerticalCarouselProps) => { 
    return (
        <>
            <div className="snap-y snap-mandatory snap-vertical">
                {props.slides.map((slide, index) => (
                    <div key={index} className="scroll-start">
                        {slide}
                    </div>
                ))}
            </div>
        </>
    );
}

export default VerticalCarousel;
