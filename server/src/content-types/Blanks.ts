import { BaseTemplate } from '../templates/BaseTemplate';
import BlanksTemplate from '../templates/BlanksTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class Blanks extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.Blanks 1.14', 'Fill in the Blanks');
    }

    public taskDescription: string;
    public task: string;
    public template: BaseTemplate = BlanksTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.taskDescription = row[6].trim();
        this.task = row[7].trim();
    }
}
