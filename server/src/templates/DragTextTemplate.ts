import DragText from '../content-types/DragText';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';

const template = (data: DragText) => ({
    media: {
        disableImageZooming: false
    },
    taskDescription: data.taskDescription,
    overallFeedback: [
        {
            from: 0,
            to: 100
        }
    ],
    checkAnswer: 'Check',
    submitAnswer: 'Submit',
    tryAgain: 'Retry',
    showSolution: 'Show solution',
    dropZoneIndex: 'Drop Zone @index.',
    empty: 'Drop Zone @index is empty.',
    contains: 'Drop Zone @index contains draggable @draggable.',
    ariaDraggableIndex: '@index of @count draggables.',
    tipLabel: 'Show tip',
    correctText: 'Correct!',
    incorrectText: 'Incorrect!',
    resetDropTitle: 'Reset drop',
    resetDropDescription: 'Are you sure you want to reset this drop zone?',
    grabbed: 'Draggable is grabbed.',
    cancelledDragging: 'Cancelled dragging.',
    correctAnswer: 'Correct answer:',
    feedbackHeader: 'Feedback',
    behaviour: {
        enableRetry: true,
        enableSolutionsButton: true,
        enableCheckButton: true,
        instantFeedback: false
    },
    scoreBarLabel: 'You got :num out of :total points',
    a11yCheck:
        'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
    a11yShowSolution:
        'Show the solution. The task will be marked with its correct solution.',
    a11yRetry:
        'Retry the task. Reset all responses and start the task over again.',
    textField: data.task
});

export default (data: DragText) => [
    InteractiveVideoInteractionTemplate(data, template)
];
