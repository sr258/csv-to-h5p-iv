import { BaseTemplate } from '../templates/BaseTemplate';
import DragTextTemplate from '../templates/DragTextTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class DragText extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.DragText 1.10', 'Drag the Words');
    }

    public taskDescription: string;
    public task: string;
    public template: BaseTemplate = DragTextTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.taskDescription = row[6].trim();
        this.task = row[7].trim();
    }
}
