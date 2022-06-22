import { ILibraryStorage } from '@lumieducation/h5p-server';

import { createUUID } from '../helpers/uuid';
import InteractiveVideo from '../content-types/InteractiveVideo';
import InteractiveVideoInteractionTemplate from './InteractiveVideoInteractionTemplate';

export default (data: InteractiveVideo) => ({
    interactiveVideo: {
        video: {
            startScreenOptions: {
                title: data.title,
                hideStartTitle: false
            },
            textTracks: {
                videoTrack: [
                    {
                        label: 'Subtitles',
                        kind: 'subtitles',
                        srcLang: 'en'
                    }
                ]
            },
            files: [
                {
                    path: data.mediaLink,
                    mime: 'video/YouTube',
                    copyright: {
                        license: 'U'
                    }
                }
            ]
        },
        assets: {
            interactions: data.interactions.map((i) => i.template(i)).flat(2),
            bookmarks: [],
            endscreens: [
                {
                    time: 262,
                    label: '4:22 Submit screen'
                }
            ]
        },
        summary: {
            task: {
                library: 'H5P.Summary 1.10',
                params: {
                    intro: 'Choose the correct statement.',
                    summaries: [
                        {
                            subContentId: createUUID(),
                            tip: ''
                        }
                    ],
                    overallFeedback: [
                        {
                            from: 0,
                            to: 100
                        }
                    ],
                    solvedLabel: 'Progress:',
                    scoreLabel: 'Wrong answers:',
                    resultLabel: 'Your result',
                    labelCorrect: 'Correct.',
                    labelIncorrect: 'Incorrect! Please try again.',
                    alternativeIncorrectLabel: 'Incorrect',
                    labelCorrectAnswers: 'Correct answers.',
                    tipButtonLabel: 'Show tip',
                    scoreBarLabel: 'You got :num out of :total points',
                    progressText: 'Progress :num of :total'
                },
                subContentId: createUUID(),
                metadata: {
                    contentType: 'Summary',
                    license: 'U',
                    title: 'Untitled Summary',
                    authors: [],
                    changes: [],
                    extraTitle: 'Untitled Summary'
                }
            },
            displayAt: 3
        }
    },
    override: {
        autoplay: true,
        loop: false,
        showBookmarksmenuOnLoad: false,
        showRewind10: true,
        preventSkipping: false,
        deactivateSound: false
    },
    l10n: {
        interaction: 'Interaction',
        play: 'Play',
        pause: 'Pause',
        mute: 'Mute, currently unmuted',
        unmute: 'Unmute, currently muted',
        quality: 'Video Quality',
        captions: 'Captions',
        close: 'Close',
        fullscreen: 'Fullscreen',
        exitFullscreen: 'Exit Fullscreen',
        summary: 'Open summary dialog',
        bookmarks: 'Bookmarks',
        endscreen: 'Submit screen',
        defaultAdaptivitySeekLabel: 'Continue',
        continueWithVideo: 'Continue with video',
        playbackRate: 'Playback Rate',
        rewind10: 'Rewind 10 Seconds',
        navDisabled: 'Navigation is disabled',
        sndDisabled: 'Sound is disabled',
        requiresCompletionWarning:
            'You need to answer all the questions correctly before continuing.',
        back: 'Back',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
        currentTime: 'Current time:',
        totalTime: 'Total time:',
        singleInteractionAnnouncement: 'Interaction appeared:',
        multipleInteractionsAnnouncement: 'Multiple interactions appeared.',
        videoPausedAnnouncement: 'Video is paused',
        content: 'Content',
        answered: '@answered answered',
        endcardTitle: '@answered Question(s) answered',
        endcardInformation:
            'You have answered @answered questions, click below to submit your answers.',
        endcardInformationOnSubmitButtonDisabled:
            'You have answered @answered questions.',
        endcardInformationNoAnswers: 'You have not answered any questions.',
        endcardInformationMustHaveAnswer:
            'You have to answer at least one question before you can submit your answers.',
        endcardSubmitButton: 'Submit Answers',
        endcardSubmitMessage: 'Your answers have been submitted!',
        endcardTableRowAnswered: 'Answered questions',
        endcardTableRowScore: 'Score',
        endcardAnsweredScore: 'answered',
        endCardTableRowSummaryWithScore:
            'You got @score out of @total points for the @question that appeared after @minutes minutes and @seconds seconds.',
        endCardTableRowSummaryWithoutScore:
            'You have answered the @question that appeared after @minutes minutes and @seconds seconds.'
    }
});
