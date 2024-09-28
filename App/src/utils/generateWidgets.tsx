import { CategoryType } from "../types/Categories";
import Exercise from "../components/categories/Exercise";
import Food from "../components/categories/Food";
import Social from "../components/categories/Social";
import Water from "../components/categories/Water";
import Widget from "../components/Widget";
import Affirmation from "../components/categories/Affirmation";

interface Widget {
    config: {
        [CategoryType.EXCERSIZE]: string[];
        [CategoryType.SOCIAL]: string[];
        [CategoryType.FOOD]: string[];
        [CategoryType.WATER]: string[];
    },
    numberOfWidgets: number;
}

/* this is the most simiplified version of what the generated code could be
* please fix it but use the same outputs
*/

export const generateWidgets = (props: Widget): React.ReactNode[] => {
    const widgets: React.ReactNode[] = [];

    for (let i = 0; i < props.numberOfWidgets; i++) {
        const task = Math.floor(Math.random() * (4 + 1));

        if (task === 0) {
            if (props.config[CategoryType.EXCERSIZE].length === 0) {
                continue;
            }
            const content = props.config[CategoryType.EXCERSIZE].splice(0,1)
            widgets.push(<Widget><Exercise exercise={content[0]} /></Widget>);
        }
        else if (task === 1) {
            if (props.config[CategoryType.SOCIAL].length === 0) {
                continue;
            }
            const content = props.config[CategoryType.SOCIAL].splice(0,1)
            widgets.push(<Widget><Social social={content[0]} /></Widget>);
        }
        else if (task === 2) {
            if (props.config[CategoryType.FOOD].length === 0) {
                continue;
            }
            const content = props.config[CategoryType.FOOD].splice(0,1)
            widgets.push(<Widget><Food food={content[0]} /></Widget>);
        }
        else if (task === 3) {
            if (props.config[CategoryType.WATER].length === 0) {
                continue;
            }
            const content = props.config[CategoryType.WATER].splice(0,1)
            widgets.push(<Widget><Water water={content[0]} /></Widget>);
        }
        else {
            const affirmation = "You are doing great!";
            widgets.push(<Widget><Affirmation affirmation={affirmation}></Affirmation></Widget>);
        }
    }
    return widgets;
}