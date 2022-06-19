import { toSeconds } from '../helpers/timecode';

export default abstract class InteractiveVideoInteraction {
    protected constructor(public type: string) {}

    public start: number;
    public end: number;
    public correctText?: string;
    public correctTimecode?: string;
    public incorrectText?: string;
    public incorrectTimecode?: string;

    public readRow(row: string[]) {
        this.start = toSeconds(row[0]);
        const length = Number.parseInt(row[1].replace(' s', '').trim());
        this.end = this.start + length;
        this.correctText = row[4] !== '' ? row[4] : undefined; // TODO: split timecode
        this.correctTimecode = row[4] !== '' ? row[4] : undefined; // TODO: split timecode
        this.incorrectText = row[5] !== '' ? row[5] : undefined; // TODO: split timecode
        this.incorrectTimecode = row[5] !== '' ? row[5] : undefined; // TODO: split timecode
    }
}
