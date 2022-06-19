import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class DragText extends InteractiveVideoInteraction {
    constructor() {
        super('DragText');
    }

    public title: string;
    public taskDescription: string;
    public task: string;

    public readRow(row: string[]) {
        super.readRow(row);

        this.title = row[3];
        this.taskDescription = row[6];
        this.task = row[7];
    }
}