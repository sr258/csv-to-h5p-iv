import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class DragQuestion extends InteractiveVideoInteraction {
    public taskDescription: string;
    public entries: {
        dragableText: string;
        dropZoneCaption: string;
    }[];
    correctText?: string;
    correctTimecode?: string;
    incorrectText?: string;
    incorrectTimecode?: string;
}
