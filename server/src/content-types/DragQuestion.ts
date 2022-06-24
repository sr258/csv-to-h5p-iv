import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class DragQuestion extends InteractiveVideoInteraction {
    constructor() {
        super('H5P.DragQuestion 1.14', 'Drag and Drop');
    }

    public taskDescription: string;
    public dropZones: {
        caption: string;
        correctDragablesIndices: number[];
    }[];
    public dragables: string[];

    public readRow(row: string[]) {
        super.readRow(row);

        this.taskDescription = row[6].trim();
        this.dropZones = [];
        this.dragables = [];
        const options = row.slice(8);
        if (options.some((o) => o.trim().replace('\n', '') === '|')) {
            // 1 : many mode
            // Add dropzones
            let currentIndex = 8;
            let currentCell = row[currentIndex];
            while (currentCell && currentCell !== '|') {
                const match = /^((.|[r\n])*?)\n---+\n([\d,]+)?\n*$/.exec(
                    currentCell
                );
                if (!match) {
                    throw new Error(
                        `Invalid Drag & Drop question data: ${currentCell}`
                    );
                }
                let indices: number[];
                try {
                    indices = match[3]?.trim()?.split(',').map(Number.parseInt);
                } catch {
                    throw new Error(
                        `Invalid Drag & Drop question data (dragable indices malformed): ${currentCell}`
                    );
                }

                this.dropZones.push({
                    caption: match[1].trim(),
                    correctDragablesIndices: indices
                });
                currentIndex++;
                currentCell = row[currentIndex];
            }

            // add dragables
            currentIndex++;
            currentCell = row[currentIndex];
            while (currentCell && currentCell !== '') {
                this.dragables.push(currentCell.trim());
                currentIndex++;
                currentCell = row[currentIndex];
            }

            // check if all indices reference an actual dragable
            const highestIndex = Math.max(
                ...this.dropZones.flatMap((dz) => dz.correctDragablesIndices)
            );
            if (highestIndex >= this.dragables.length) {
                throw new Error(
                    'Invalid Drag & Drop question data (there are fewer dragables than referenced as correct answers)'
                );
            }
        } else {
            // 1 : 1 mode
            let nextCell = row[8];
            let currentIndex = 8;
            while (nextCell && nextCell !== '') {
                const match = /^((.|[r\n])*?)\n---+\n((.|[r\n])*?)\n*$/.exec(
                    nextCell
                );
                if (!match) {
                    throw new Error(
                        `Invalid Drag & Drop question data: ${nextCell}`
                    );
                }
                this.dropZones.push({
                    caption: match[1].trim(),
                    correctDragablesIndices: [currentIndex - 8]
                });
                this.dragables.push(match[3].trim());
                currentIndex++;
                nextCell = row[currentIndex];
            }
        }
    }
}
