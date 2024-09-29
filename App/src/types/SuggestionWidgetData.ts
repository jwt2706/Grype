import { AnimationType } from "./Animation";
import { CategoryType } from "./Categories";

export class SuggestionWidgetData {
    public animation: AnimationType;
    public suggestion: string;
    public type: CategoryType;

    constructor(_animation: AnimationType, _suggestion: string, _type: CategoryType) {
        this.animation = _animation;
        this.suggestion = _suggestion;
        this.type = _type;
    }
}
