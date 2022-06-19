export default abstract class InteractiveVideoInteraction {
    protected constructor(public type: string) {}

    public start: string;
    public end: string;
    public correctText?: string;
    public correctTimecode?: string;
    public incorrectText?: string;
    public incorrectTimecode?: string;



    public readRow(row: string[]) {
        this.start = row[0];
        this.end = row[1]; // TODO: convert to timecode
        this.correctText = row[4] !== '' ? row[4] : undefined; // TODO: split timecode
        this.correctTimecode = row[4] !== '' ? row[4] : undefined; // TODO: split timecode
        this.incorrectText = row[5] !== '' ? row[5] : undefined; // TODO: split timecode
        this.incorrectTimecode = row[5] !== '' ? row[5] : undefined; // TODO: split timecode
    }
}
