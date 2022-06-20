import { ILibraryStorage, LibraryName } from '@lumieducation/h5p-server';
import { createUUID } from 'src/helpers/uuid';

import InteractiveVideoInteraction from '../content-types/InteractiveVideoInteraction';

export default async (
    data: InteractiveVideoInteraction,
    libStorage: ILibraryStorage
) => {
    const libraryTitle = (
        await libStorage.getLibrary(
            LibraryName.fromUberName(data.type, { useWhitespace: true })
        )
    ).title;
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
            libraryTitle: libraryTitle,
            action: {
                library: data.type,
                params: data.template(data, libStorage),
                subContentId: createUUID(),
                metadata: {
                    contentType: libraryTitle,
                    license: 'U',
                    title: `${libraryTitle}: ${data.title}`,
                    authors: [],
                    changes: [],
                    extraTitle: `${libraryTitle}: ${data.title}`
                }
            },
            pause: true,
            displayType: 'poster',
            buttonOnMobile: false,
            adaptivity: {
                correct: {
                    allowOptOut: false,
                    message: data.correctText
                },
                wrong: {
                    allowOptOut: false,
                    message: data.incorrectText
                },
                requireCompletion: false
            },
            label: data.title
        }
    ];
};
