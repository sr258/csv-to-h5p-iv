import { BaseTemplate } from '../templates/BaseTemplate';
import FreeTextQuestionTemplate from '../templates/FreeTextQuestionTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class FreeTextQuestion extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.FreeTextQuestion 1.0', 'Free Text Question');
    }

    public question: string;
    public placeholder: string;
    public template: BaseTemplate = FreeTextQuestionTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.question = row[6].trim();
        this.placeholder = row[7].trim();
    }
}
