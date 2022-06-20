import { ILibraryStorage } from '@lumieducation/h5p-server';

import InteractiveVideoInteraction from '../content-types/InteractiveVideoInteraction';

export type BaseTemplate = (
    data: InteractiveVideoInteraction,
    libStorage: ILibraryStorage
) => any;
