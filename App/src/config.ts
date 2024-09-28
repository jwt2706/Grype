export const CONFIG = {
    /**
     * @brief Height divided by width
     */
    TARGET_ASPECT_RATIO: 19 / 10,
    /**
     * @brief The minimum ratio where if it's over it, just roll with it
     */
    ACCEPTABLE_RATIO: 19 / 12,
    /**
     * @brief The max widgets that the app will generate for a given day
     */
    MAX_WIDGETS: 4,
    /**
    * @brief The time after which it is considered the end of day (military time)
    */
    END_OF_DAY_TIME: 18,
    /**
    * @brief the minimum distance for a scroll to be conuted
    */
    MIN_PAN_FOR_SCROLL: 100,

    /**
     * @brief Where the backend is hosted
     */
    BACKEND_HOST: `http://${window.location.hostname}:5000`,
}
