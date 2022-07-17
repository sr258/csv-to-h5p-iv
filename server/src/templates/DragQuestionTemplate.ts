import { createUUID } from '../helpers/uuid';
import DragQuestion from '../content-types/DragQuestion';
import { toHtml } from '../helpers/html';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';
import arrayShuffle from 'array-shuffle';

const spacingX = 2;
const dragableHeight = 5;
const dropzoneHeight = 6.25;
const maxWidthEm = 37;

const percentToEm = (percent: number) => (percent / 100) * maxWidthEm;

const template = (data: DragQuestion) => {
    const randomizedDragables = arrayShuffle(data.dragables);

    return {
        scoreShow: 'Check',
        submit: 'Submit',
        tryAgain: 'Retry',
        scoreExplanation:
            'Correct answers give +1 point. Incorrect answers give -1 point. The lowest possible score is 0.',
        question: {
            settings: {
                size: {
                    width: 620,
                    height: 310
                }
            },
            task: {
                elements: [
                    {
                        x: 0,
                        y: 0,
                        width: maxWidthEm,
                        height: 5,
                        dropZones: [],
                        type: {
                            library: 'H5P.AdvancedText 1.1',
                            params: {
                                text: toHtml(data.taskDescription, {
                                    paragraph: 'p'
                                })
                            },
                            metadata: {
                                contentType: 'Text',
                                license: 'U',
                                title: 'Untitled Text',
                                authors: [],
                                changes: []
                            }
                        },
                        backgroundOpacity: 0,
                        multiple: false
                    },
                    ...randomizedDragables.map((d, dIndex) => ({
                        x: (100 / data.dragables.length) * dIndex,
                        y: 25.8,
                        width:
                            (maxWidthEm -
                                percentToEm(spacingX + 1.8) *
                                    data.dragables.length) /
                            data.dragables.length,
                        height: dragableHeight,
                        dropZones: data.dropZones.map((z, index) => `${index}`),
                        type: {
                            library: 'H5P.AdvancedText 1.1',
                            params: {
                                text: toHtml(d, { paragraph: 'div' })
                            },
                            subContentId: createUUID(),
                            metadata: {
                                contentType: 'Text',
                                license: 'U',
                                title: 'Untitled Text',
                                authors: [],
                                changes: []
                            }
                        },
                        backgroundOpacity: 100,
                        multiple: false
                    }))
                ],
                dropZones: data.dropZones.map((d, dIndex) => ({
                    x: ((100 - spacingX) / data.dropZones.length) * dIndex,
                    y: 67.70,
                    width:
                        (maxWidthEm * 1.06 -
                            percentToEm(spacingX) * data.dropZones.length) /
                        data.dropZones.length,
                    height: dropzoneHeight,
                    correctElements:
                        d.correctDragablesIndices?.map(
                            (i) =>
                                `${randomizedDragables.indexOf(
                                    data.dragables[i]
                                )}`
                        ) ?? [],
                    showLabel: true,
                    backgroundOpacity: 100,
                    tipsAndFeedback: {
                        tip: ''
                    },
                    single: true,
                    autoAlign: true,
                    label: toHtml(d.caption, { paragraph: 'div' }),
                    type: {
                        library: 'H5P.DragQuestionDropzone 0.1'
                    }
                }))
            }
        },
        overallFeedback: [
            {
                from: 0,
                to: 100
            }
        ],
        behaviour: {
            enableRetry: true,
            enableCheckButton: true,
            singlePoint: false,
            applyPenalties: true,
            enableScoreExplanation: true,
            dropZoneHighlighting: 'dragging',
            autoAlignSpacing: 2,
            enableFullScreen: false,
            showScorePoints: true,
            showTitle: true
        },
        grabbablePrefix: 'Grabbable {num} of {total}.',
        grabbableSuffix: 'Placed in dropzone {num}.',
        dropzonePrefix: 'Dropzone {num} of {total}.',
        noDropzone: 'No dropzone.',
        tipLabel: 'Show tip.',
        tipAvailable: 'Tip available',
        correctAnswer: 'Correct answer',
        wrongAnswer: 'Wrong answer',
        feedbackHeader: 'Feedback',
        scoreBarLabel: 'You got :num out of :total points',
        scoreExplanationButtonLabel: 'Show score explanation',
        a11yCheck:
            'Check the answers. The responses will be marked as correct, incorrect, or unanswered.',
        a11yRetry:
            'Retry the task. Reset all responses and start the task over again.',
        localize: {
            fullscreen: 'Fullscreen',
            exitFullscreen: 'Exit fullscreen'
        }
    };
};

export default (data: DragQuestion) => [
    InteractiveVideoInteractionTemplate(data, template)
];
