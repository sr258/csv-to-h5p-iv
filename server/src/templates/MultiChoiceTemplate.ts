import MultiChoice from '../content-types/MultiChoice';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';

const template = (data: MultiChoice) => ({
    media: {
        disableImageZooming: false
    },
    answers: data.options.map((o) => ({
        correct: o.correct,
        tipsAndFeedback: {
            tip: '',
            chosenFeedback: '',
            notChosenFeedback: ''
        },
        text: o.text
    })),
    overallFeedback: [
        {
            from: 0,
            to: 100
        }
    ],
    behaviour: {
        enableRetry: true,
        enableSolutionsButton: true,
        enableCheckButton: true,
        type: 'auto',
        singlePoint: false,
        randomAnswers: true,
        showSolutionsRequiresInput: true,
        confirmCheckDialog: false,
        confirmRetryDialog: false,
        autoCheck: false,
        passPercentage: 100,
        showScorePoints: true
    },
    UI: {
        checkAnswerButton: 'Check',
        submitAnswerButton: 'Submit',
        showSolutionButton: 'Show solution',
        tryAgainButton: 'Retry',
        tipsLabel: 'Show tip',
        scoreBarLabel: 'You got :num out of :total points',
        tipAvailable: 'Tip available',
        feedbackAvailable: 'Feedback available',
        readFeedback: 'Read feedback',
        wrongAnswer: 'Wrong answer',
        correctAnswer: 'Correct answer',
        shouldCheck: 'Should have been checked',
        shouldNotCheck: 'Should not have been checked',
        noInput: 'Please answer before viewing the solution',
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

export default (data: MultiChoice) => [
    InteractiveVideoInteractionTemplate(data, template)
];
