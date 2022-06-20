import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class DragText extends InteractiveVideoInteraction {
    constructor() {
        super('DragText');
    }

    public taskDescription: string;
    public task: string;

    public readRow(row: string[]) {
        super.readRow(row);

        this.taskDescription = row[6].trim();
        this.task = row[7].trim();
    }
}
