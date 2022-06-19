import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class SingleChoiceSet extends InteractiveVideoInteraction {
    constructor() {
        super('SingleChoiceSet');
    }

    public title: string;
    public question: string;
    public options: string[];

    public readRow(row: string[]) {
        super.readRow(row);

        this.title = row[3].trim();
        this.question = row[6].trim();
        this.options = row[7].split('\n').map((o) => o.trim());
    }
}
