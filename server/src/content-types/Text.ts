import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class Text extends InteractiveVideoInteraction {
    constructor() {
        super('Text');
    }
    public text: string;

    public readRow(row: string[]) {
        super.readRow(row);

        this.text = row[6];
    }
}
