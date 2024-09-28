import React from "react";
import { AnimatePresence, motion, PanInfo } from "framer-motion";
import { CONFIG } from "../config";

interface VerticalCarouselProps {
    slides: React.ReactNode[];
}

const VerticalCarousel = (props: VerticalCarouselProps) => {
    const [index, setIndex] = React.useState(0);

    const currentSlide = props.slides[index];

    const onDragEnd = (event, info: PanInfo) => {
        // Flip the direction of the config since we're scrolling in -y direction
        if (info.offset.y <= -CONFIG.MIN_PAN_FOR_SCROLL && index < props.slides.length - 1) {
            setIndex(index + 1)
        }
    }

    return (
        <AnimatePresence>
            {props.slides.map((slide, key) =>
                <span key={key.toString()}>
                    {index == key &&
                        <motion.span
                            key={key.toString()}
                            initial={{ y: 500, opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ y: -500, opacity: 0 }}
                        >
                            {index == props.slides.length - 1 ?
                                <div className="snap-y snap-mandatory snap-vertical">
                                    {currentSlide}
                                </div>

                                : <motion.div className="snap-y snap-mandatory snap-vertical"
                                    drag="y"
                                    dragConstraints={{
                                        top: -20,
                                        left: 0,
                                        right: 0,
                                        bottom: 0
                                    }}
                                    onDragEnd={onDragEnd}
                                >
                                    {currentSlide}
                                </motion.div>
                            }
                        </motion.span>
                    }
                </span>
            )
            }
        </AnimatePresence >
    );
}

export default VerticalCarousel;
