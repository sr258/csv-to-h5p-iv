import { BaseTemplate } from '../templates/BaseTemplate';
import TrueFalseTemplate from '../templates/TrueFalseTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class TrueFalse extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.TrueFalse 1.8', 'True/False Question');
    }

    public question: string;
    public answer: boolean;
    public template: BaseTemplate = TrueFalseTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.question = row[6].trim();
        const cleanedAnswer = row[7].trim().toLocaleLowerCase();
        if (cleanedAnswer === 'true') {
            this.answer = true;
        } else if (cleanedAnswer === 'false') {
            this.answer = false;
        } else {
            throw new Error(
                'Invalid data for true false question answer in column 8'
            );
        }
    }
}
