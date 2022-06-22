import { createUUID } from '../helpers/uuid';
import InteractiveVideoInteraction from '../content-types/InteractiveVideoInteraction';
import { BaseTemplate } from './BaseTemplate';

export default (
    data: InteractiveVideoInteraction,
    paramsTemplate: BaseTemplate
) => {
    return [
        {
            x: 0,
            y: 0,
            width: 40,
            height: 22.494286348318848,
            duration: {
                from: data.start,
                to: data.end
            },
            libraryTitle: data.libraryTitle,
            action: {
                library: data.type,
                params: paramsTemplate(data),
                subContentId: createUUID(),
                metadata: {
                    contentType: data.libraryTitle,
                    license: 'U',
                    title: `${data.libraryTitle}: ${data.title}`,
                    authors: [],
                    changes: [],
                    extraTitle: `${data.libraryTitle}: ${data.title}`
                }
            },
            pause: true,
            displayType: 'poster',
            buttonOnMobile: false,
            adaptivity: {
                correct: {
                    allowOptOut: false,
                    message: data.correctText,
                    seekTo: data.correctTime
                },
                wrong: {
                    allowOptOut: false,
                    message: data.incorrectText,
                    seekTo: data.incorrectTime
                },
                requireCompletion: false
            },
            label: data.title
        }
    ];
};
