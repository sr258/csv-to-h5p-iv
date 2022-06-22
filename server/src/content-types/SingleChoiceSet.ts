import { BaseTemplate } from '../templates/BaseTemplate';
import SingleChoiceSetTemplate from '../templates/SingleChoiceSetTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class SingleChoiceSet extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.SingleChoiceSet 1.11', 'Single Choice Set');
    }

    public question: string;
    public options: string[];
    public template: BaseTemplate = SingleChoiceSetTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.question = row[6].trim();
        this.options = row[7].split('\n').map((o) => o.trim());
    }
}
