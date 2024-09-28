import React from "react";

interface VerticalCarouselProps {
    slides: React.ReactNode[];
}

const VerticalCarousel = (props: VerticalCarouselProps) => { 
    return (
        <>
            <div className="snap-y snap-proximity">
                {props.slides.map((slide, index) => (
                    <div key={index} className="snap-start">
                        {slide}
                    </div>
                ))}
            </div>
        </>
    );
}

export default VerticalCarousel;
