import { BaseTemplate } from '../templates/BaseTemplate';
import MultiChoiceTemplate from '../templates/MultiChoiceTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class MultiChoice extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.MultiChoice 1.16', 'Multiple Choice');
    }

    public question: string;
    public options: {
        text: string;
        correct: boolean;
    }[];
    public template: BaseTemplate = MultiChoiceTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.question = row[6].trim();
        this.options = row[7]
            .split('\n')
            .map((o) => o.trim())
            .map((o) => {
                const match = /^\*\s*(.+)/.exec(o);
                if (match) {
                    return {
                        text: match[1].trim(),
                        correct: true
                    };
                }
                return {
                    text: o.trim(),
                    correct: false
                };
            });
    }
}
