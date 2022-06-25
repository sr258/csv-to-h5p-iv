import { markdownLinkToHtml, toHtml } from '../helpers/html';
import Blanks from '../content-types/Blanks';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';

const template = (data: Blanks) => ({
    media: {
        disableImageZooming: false
    },
    text: markdownLinkToHtml(toHtml(data.taskDescription)),
    overallFeedback: [
        {
            from: 0,
            to: 100
        }
    ],
    showSolutions: 'Show solution',
    tryAgain: 'Retry',
    checkAnswer: 'Check',
    submitAnswer: 'Submit',
    notFilledOut: 'Please fill in all blanks to view solution',
    answerIsCorrect: '&#039;:ans&#039; is correct',
    answerIsWrong: '&#039;:ans&#039; is wrong',
    answeredCorrectly: 'Answered correctly',
    answeredIncorrectly: 'Answered incorrectly',
    solutionLabel: 'Correct answer:',
    inputLabel: 'Blank input @num of @total',
    inputHasTipLabel: 'Tip available',
    tipLabel: 'Tip',
    behaviour: {
        enableRetry: true,
        enableSolutionsButton: true,
        enableCheckButton: true,
        autoCheck: false,
        caseSensitive: true,
        showSolutionsRequiresInput: true,
        separateLines: false,
        confirmCheckDialog: false,
        confirmRetryDialog: false,
        acceptSpellingErrors: false
    },
    scoreBarLabel: 'You got :num out of :total points',
    a11yCheck:
        'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
    a11yShowSolution:
        'Show the solution. The task will be marked with its correct solution.',
    a11yRetry:
        'Retry the task. Reset all responses and start the task over again.',
    a11yCheckingModeHeader: 'Checking mode',
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
    questions: [toHtml(data.task)]
});

export default (data: Blanks) => [
    InteractiveVideoInteractionTemplate(data, template)
];
