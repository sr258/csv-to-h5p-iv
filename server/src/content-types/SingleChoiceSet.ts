import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export default class SingleChoiceSet extends InteractiveVideoInteraction {
    public title: string;
    public question: string;
    public options: string[];
}
