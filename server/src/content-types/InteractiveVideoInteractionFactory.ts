import Blanks from './Blanks';
import DragQuestion from './DragQuestion';
import DragText from './DragText';
import FreeTextQuestion from './FreeTextQuestion';
import SingleChoiceSet from './FreeTextQuestion';
import MultipleChoice from './MultipleChoice';
import TrueFalse from './TrueFalse';
import Text from './Text';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';

export const createInteractiveVideoInteractionFromRow = (
    row: string[]
): InteractiveVideoInteraction => {
    if (row[2] === '') {
        throw new Error('No content type specified in column 3');
    }
    let interaction: InteractiveVideoInteraction;
    switch (row[2].toLocaleLowerCase().trim()) {
        case 'drag text':
            interaction = new DragText();
            break;
        case 'single choice':
            interaction = new SingleChoiceSet();
            break;
        case 'true false':
            interaction = new TrueFalse();
            break;
        case 'fill in the blanks':
            interaction = new Blanks();
            break;
        case 'drag and drop':
            interaction = new DragQuestion();
            break;
        case 'free text':
            interaction = new FreeTextQuestion();
            break;
        case 'multiple choice':
            interaction = new MultipleChoice();
            break;
        case 'text':
            interaction = new Text();
            break;
        default:
            throw new Error(`Invalid content type name in row 3: ${row[2]}`);
    }
    interaction.readRow(row);

    return interaction;
};
