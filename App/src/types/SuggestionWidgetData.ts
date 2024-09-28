import { AnimationType } from "./Animation";

export class SuggestionWidgetData {
    public animation: AnimationType;
    public suggestion: string;

    constructor(_animation: AnimationType, _suggestion: string) {
        this.animation = _animation;
        this.suggestion = _suggestion;
    }
}
