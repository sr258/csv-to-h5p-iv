import { BaseTemplate } from '../templates/BaseTemplate';
import { toSeconds } from '../helpers/timecode';

export default abstract class InteractiveVideoInteraction {
    protected constructor(public type: string, public libraryTitle) {}

    public start: number;
    public end: number;
    public correctText?: string;
    public correctTime?: number;
    public incorrectText?: string;
    public incorrectTime?: number;
    public title?: string;
    public template: BaseTemplate = () => ({});

    public readRow(row: string[]) {
        this.title = row[3].trim();
        this.start = toSeconds(row[0]);
        const length = Number.parseInt(row[1].replace(' s', '').trim());
        this.end = this.start + length;

        const correctAdaptiveAction = this.splitAdaptiveAction(row[4]);
        const incorrectAdaptiveAction = this.splitAdaptiveAction(row[5]);

        this.correctText = correctAdaptiveAction.text;
        this.correctTime = correctAdaptiveAction.time;
        this.incorrectText = incorrectAdaptiveAction.text;
        this.incorrectTime = incorrectAdaptiveAction.time;
    }

    private splitAdaptiveAction = (
        action: string
    ): {
        text: string;
        time: number;
    } => {
        if (!action) {
            return {
                text: undefined,
                time: undefined
            };
        }
        const match = /^\s*(.*?)\s*(\(\s*([\d:.]+)\s*\))?\s*$/.exec(action);
        if (!match || match.length === 0) {
            return {
                text: undefined,
                time: undefined
            };
        }

        return {
            text: match[1],
            time: match[3] ? toSeconds(match[3]) : undefined
        };
    };
}
