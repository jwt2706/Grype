import { CategoryType } from "../types/Categories";

type PerformanceEntry = {
    type: CategoryType,
    performance: number,
}

class _PerformanceService {

    data: Record<string, PerformanceEntry[]> = {};

    constructor() {
        const storageData = localStorage.getItem("past_performance")

        if (!storageData) return;

        try {
            const data = JSON.parse(storageData)
            this.data = data;
        }
        catch (_) {
            //
        }
    }

    public addEntry(type: CategoryType, performance: number) {
        const newEntry = {type, performance};
        const key = this.getDate()

        if (!this.data[key]) {
            this.data[key] = [newEntry]
        }
        else {
            this.data[key].push(newEntry)
        }

        this.saveData();
    }

    private saveData() {
        localStorage.setItem("past_performance", JSON.stringify(this.data));
    }

    private getDate(): string {
        const date = new Date()

        return `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`;
    }

}

export const PerformanceService = new _PerformanceService()
