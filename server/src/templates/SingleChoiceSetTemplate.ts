import SingleChoiceSet from '../content-types/SingleChoiceSet';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';
import { createUUID } from '../helpers/uuid';

const template = (data: SingleChoiceSet) => [
    {
        choices: [
            {
                subContentId: createUUID(),
                question: data.question,
                answers: data.options
            }
        ],
        overallFeedback: [
            {
                from: 0,
                to: 100
            }
        ],
        behaviour: {
            autoContinue: true,
            timeoutCorrect: 2000,
            timeoutWrong: 3000,
            soundEffectsEnabled: true,
            enableRetry: true,
            enableSolutionsButton: false,
            passPercentage: 100
        },
        l10n: {
            nextButtonLabel: 'Next question',
            showSolutionButtonLabel: 'Show solution',
            retryButtonLabel: 'Retry',
            solutionViewTitle: 'Solution list',
            correctText: 'Correct!',
            incorrectText: 'Incorrect!',
            muteButtonLabel: 'Mute feedback sound',
            closeButtonLabel: 'Close',
            slideOfTotal: 'Slide :num of :total',
            scoreBarLabel: 'You got :num out of :total points',
            solutionListQuestionNumber: 'Question :num',
            a11yShowSolution:
                'Show the solution. The task will be marked with its correct solution.',
            a11yRetry:
                'Retry the task. Reset all responses and start the task over again.'
        }
    }
];

export default (data: SingleChoiceSet) => [
    InteractiveVideoInteractionTemplate(data, template)
];
