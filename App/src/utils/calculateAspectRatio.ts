
/**
 * @brief Height divided by width
 */
const TARGET_ASPECT_RATIO = 19 / 10;

/**
 * @brief The minimum ratio where if it's over it, just roll with it
 */
const ACCEPTABLE_RATIO = 19 / 12;

/**
 * Width: The width that you should hardcode the app to run as
 * Height: The height that we should hardcode the app to run as (It will always be the window height)
 * Padding: Helper for the padding that must be put on the left and right of the main app context for centering
 */
export type AspectRatio = {
    width: number,
    height: number
    padding: number,
}


/**
 * @brief Calculates the information the information we should hardode the app to use
 */
export function calculateAspectRatio(): AspectRatio {
    const height = window.innerHeight;
    const width = window.innerWidth;

    const currentRatio = height / width;

    if (currentRatio > ACCEPTABLE_RATIO) {
        return {
            height,
            width,
            padding: 0
        }
    }

    const desiredWidth = Math.floor((height / TARGET_ASPECT_RATIO) / 2) * 2;

    const desiredPadding = (width - desiredWidth) / 2;

    if (desiredPadding * 2 + desiredWidth != width) {
        console.warn(`padding: ${desiredPadding} and width ${desiredWidth} don't equal ${width}`);
    }

    return {
        height,
        width: desiredWidth,
        padding: desiredPadding
    }
}
