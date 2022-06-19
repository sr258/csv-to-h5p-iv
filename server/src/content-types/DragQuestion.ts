import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class DragQuestion extends InteractiveVideoInteraction {
    constructor() {
        super('DragQuestion');
    }

    public taskDescription: string;
    public entries: {
        dragableText: string;
        dropZoneCaption: string;
    }[];

    public readRow(row: string[]) {
        super.readRow(row);

        this.taskDescription = row[6];
        this.entries = [];
        let nextCell = row[8];
        let index = 8;
        while (nextCell && nextCell !== '') {
            const match = /^((.|[r\n])*?)\n---+\n((.|[r\n])*?)$/.exec(nextCell);
            if (!match) {
                throw new Error(
                    `Invalid Drag & Drop question data: ${nextCell}`
                );
            }
            this.entries.push({
                dropZoneCaption: match[1],
                dragableText: match[3]
            });
            index++;
            nextCell = row[index];
        }
    }
}
