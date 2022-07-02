import { BaseTemplate } from '../templates/BaseTemplate';
import SingleChoiceSetTemplate from '../templates/SingleChoiceSetTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class SingleChoiceSet extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.SingleChoiceSet 1.11', 'Single Choice Set');
    }

    public questions: {
        question: string;
        options: string[];
    }[];

    public template: BaseTemplate = SingleChoiceSetTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.questions = [];

        let currentIndex = 6;

        while (
            row[currentIndex] &&
            row[currentIndex] !== '' &&
            row[currentIndex + 1] &&
            row[currentIndex + 1] !== ''
        ) {
            this.questions.push({
                question: row[currentIndex].trim(),
                options: row[currentIndex + 1]
                    .split('\n')
                    .map((o) => o.replace('\r', '').trim())
            });
            currentIndex += 2;
        }
    }
}
