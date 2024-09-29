import { CONFIG } from "../config";
import { AnimationType } from "../types/Animation";
import { CategoryType } from "../types/Categories";
import { EndOfDayWidgetData } from "../types/EndOfDayWidgetData";
import { EndWidgetData } from "../types/EndWidgetData";
import { SuggestionWidgetData } from "../types/SuggestionWidgetData";
//import Exercise from "../components/categories/Exercise.tsx"

type WidgetData = SuggestionWidgetData | EndWidgetData | EndOfDayWidgetData


class _ContentSerrvice {
    private generateWidgetsData(): WidgetData[] {
        const widgets: WidgetData[] = [];

        for (let i = 0; i < CONFIG.MAX_WIDGETS; i++) {
            widgets.push(new SuggestionWidgetData(AnimationType.UNSPECIFIED, "Bake some beans!", ));
        }

        // ensure the topics are in random orders
        this.shuffle(widgets);

        const currentTime = new Date().getHours();

        if (currentTime > CONFIG.END_OF_DAY_TIME) {
            widgets.push(new EndOfDayWidgetData(AnimationType.UNSPECIFIED))
        }

        widgets.push(new EndWidgetData(AnimationType.UNSPECIFIED))

        return widgets;
    }


    // Fisher - Yates algorithm https://stackoverflow.com/a/2450976
    private shuffle(array: unknown[]) {
        let currentIndex = array.length;

        // While there remain elements to shuffle...
        while (currentIndex != 0) {

            // Pick a remaining element...
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }
    }
}

export const ContentService = new _ContentSerrvice();
