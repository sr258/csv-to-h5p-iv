import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class IMultipleChoice extends InteractiveVideoInteraction {
    public title: string;
    public question: string;
    public options: {
        text: string;
        correct: boolean;
    }[];
}
