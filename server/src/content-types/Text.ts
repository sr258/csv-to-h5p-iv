import { BaseTemplate } from '../templates/BaseTemplate';
import TextTemplate from '../templates/TextTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class Text extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.Text 1.1', 'Text');
    }
    public text: string;
    public template: BaseTemplate = TextTemplate;

    public readRow(row: string[]) {
        super.readRow(row);

        this.text = row[6].trim();
    }
}
