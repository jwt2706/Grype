import { CONFIG } from "../config";
import { AnimationType } from "../types/Animation";
import { EndOfDayWidgetData } from "../types/EndOfDayWidgetData";
import { EndWidgetData } from "../types/EndWidgetData";
import { SuggestionWidgetData } from "../types/SuggestionWidgetData";

type WidgetData = SuggestionWidgetData | EndWidgetData | EndOfDayWidgetData


class _ContentSerrvice {
    generateWidgets(): WidgetData[] {
        const widgets: WidgetData[] = [];

        for (let i = 0; i < CONFIG.MAX_WIDGETS; i++) {
            widgets.push(new SuggestionWidgetData(AnimationType.UNSPECIFIED, "Bake some beans!"));
        }

        const currentTime = new Date().getHours();

        if (currentTime > CONFIG.END_OF_DAY_TIME) {
            widgets.push(new EndOfDayWidgetData(AnimationType.UNSPECIFIED))
        }

        widgets.push(new EndWidgetData(AnimationType.UNSPECIFIED))

        return widgets;
    }
}

export const ContentService = new _ContentSerrvice();
