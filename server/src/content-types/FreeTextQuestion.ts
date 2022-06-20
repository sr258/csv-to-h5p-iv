import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class FreeTextQuestion extends InteractiveVideoInteraction {
    constructor() {
        super('FreeTextQuestion');
    }    

    public question: string;
    public placeholder: string;

    public readRow(row: string[]) {
        super.readRow(row);

        this.question = row[6].trim();
        this.placeholder = row[7].trim();
    }
}
