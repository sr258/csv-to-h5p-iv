import { toHtml } from '../helpers/html';
import FreeTextQuestion from '../content-types/FreeTextQuestion';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';

const template = (data: FreeTextQuestion) => ({
    placeholder: data.placeholder,
    maxScore: 1,
    isRequired: false,
    i10n: {
        requiredText: 'required',
        requiredMessage: 'This question requires an answer',
        skipButtonLabel: 'Skip Question',
        submitButtonLabel: 'Answer and proceed',
        language: 'en'
    },
    question: toHtml(data.question, { noParagraph: true })
});

export default (data: FreeTextQuestion) => [
    InteractiveVideoInteractionTemplate(data, template)
];
