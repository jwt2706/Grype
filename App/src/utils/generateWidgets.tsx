import { CategoryList, CategoryType } from "../types/Categories";
import Exercise from "../components/categories/Exercise";
import Food from "../components/categories/Food";
import Social from "../components/categories/Social";
import Water from "../components/categories/Water";
import Widget from "../components/Widget";
import Sleep from "../components/categories/Sleep";
import Learning from "../components/categories/Learning";
import Productivity from "../components/categories/Productivity";
import Hygene from "../components/categories/Hygene";
import Affirmation from "../components/categories/Affirmation";
import EndCard from "../components/categories/EndCard"
import { Affirmations } from "./constants";

export interface Widget {
    config: Record<CategoryType, string[]>,
    numberOfWidgets: number
}

/* this is the most simiplified version of what the generated code could be
* please fix it but use the same outputs\
* you need to call the api to get the config
*/

export const generateWidgets = (props: Widget): React.ReactNode[] => {
    const widgets: React.ReactNode[] = [];

    for (let i = 0; i < props.numberOfWidgets; i++) {
        const task = Math.floor(Math.random() * (CategoryList.length + 1));

        if (task === 0) {
            if (props.config[CategoryType.EXERCISE].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.EXERCISE].splice(0, 1)
            widgets.push(<Widget><Exercise exercise={content[0]} /></Widget>);
        }
        else if (task === 1) {
            if (props.config[CategoryType.SOCIAL].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.SOCIAL].splice(0, 1)
            widgets.push(<Widget><Social social={content[0]} /></Widget>);
        }
        else if (task === 2) {
            if (props.config[CategoryType.FOOD].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.FOOD].splice(0, 1)
            widgets.push(<Widget><Food food={content[0]} /></Widget>);
        }
        else if (task === 3) {
            if (props.config[CategoryType.WATER].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.WATER].splice(0, 1)
            widgets.push(<Widget><Water drink={content[0]} /></Widget>);
        } else if (task === 4) {
            if (props.config[CategoryType.SLEEP].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.SLEEP].splice(0, 1)
            widgets.push(<Widget><Sleep sleep={content[0]} /></Widget>);

        } else if (task === 5) {
            if (props.config[CategoryType.PRODUCTIVITY].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.PRODUCTIVITY].splice(0, 1)
            widgets.push(<Widget><Productivity productivity={content[0]} /></Widget>);

        } else if (task === 6) {
            if (props.config[CategoryType.HYGENE].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.HYGENE].splice(0, 1)
            widgets.push(<Widget><Hygene hygene={content[0]} /></Widget>);

        } else if (task === 7) {
            if (props.config[CategoryType.LEARNING].length === 0) {
                i--;
                continue;
            }
            const content = props.config[CategoryType.LEARNING].splice(0, 1)
            widgets.push(<Widget><Learning learning={content[0]} /></Widget>);

        }
        else {
            const index = Math.floor(Math.random() * Affirmations.length);
            const affirmation = Affirmations[index];
            widgets.push(<Widget><Affirmation affirmation={affirmation}></Affirmation></Widget>);
        }
    }

    widgets.push(<Widget><EndCard></EndCard></Widget>)
    return widgets;
}
