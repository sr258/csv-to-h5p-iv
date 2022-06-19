import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class MultipleChoice extends InteractiveVideoInteraction {
    constructor() {
        super('MultipleChoice');
    }

    public title: string;
    public question: string;
    public options: {
        text: string;
        correct: boolean;
    }[];

    public readRow(row: string[]) {
        super.readRow(row);

        this.title = row[3].trim();
        this.question = row[6].trim();
        this.options = row[7]
            .split('\n')
            .map((o) => o.trim())
            .map((o) => {
                const match = /^\*\s*(.+)/.exec(o);
                if (match) {
                    return {
                        text: match[1].trim(),
                        correct: true
                    };
                }
                return {
                    text: o.trim(),
                    correct: false
                };
            });
    }
}
