import TrueFalse from '../content-types/TrueFalse';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';

const template = (data: TrueFalse) => ({
    media: {
        disableImageZooming: false
    },
    correct: data.answer ? 'true' : 'false',
    behaviour: {
        enableRetry: false,
        enableSolutionsButton: false,
        enableCheckButton: true,
        confirmCheckDialog: false,
        confirmRetryDialog: false,
        autoCheck: false
    },
    l10n: {
        trueText: 'True',
        falseText: 'False',
        score: 'You got @score of @total points',
        checkAnswer: 'Check',
        submitAnswer: 'Submit',
        showSolutionButton: 'Show solution',
        tryAgain: 'Retry',
        wrongAnswerMessage: 'Wrong answer',
        correctAnswerMessage: 'Correct answer',
        scoreBarLabel: 'You got :num out of :total points',
        a11yCheck:
            'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
        a11yShowSolution:
            'Show the solution. The task will be marked with its correct solution.',
        a11yRetry:
            'Retry the task. Reset all responses and start the task over again.'
    },
    confirmCheck: {
        header: 'Finish ?',
        body: 'Are you sure you wish to finish ?',
        cancelLabel: 'Cancel',
        confirmLabel: 'Finish'
    },
    confirmRetry: {
        header: 'Retry ?',
        body: 'Are you sure you wish to retry ?',
        cancelLabel: 'Cancel',
        confirmLabel: 'Confirm'
    },
    question: data.question
});

export default (data: TrueFalse) => [
    InteractiveVideoInteractionTemplate(data, template)
];
