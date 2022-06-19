export default abstract class InteractiveVideoInteraction {
    public type: string;
    public start: string;
    public end: string;
    public correctText?: string;
    public correctTimecode?: string;
    public incorrectText?: string;
    public incorrectTimecode?: string;
}
