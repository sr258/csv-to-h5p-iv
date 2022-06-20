import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class SingleChoiceSet extends InteractiveVideoInteraction {
    constructor() {
        super('SingleChoiceSet');
    }

    public question: string;
    public options: string[];

    public readRow(row: string[]) {
        super.readRow(row);

        this.question = row[6].trim();
        this.options = row[7].split('\n').map((o) => o.trim());
    }
}
