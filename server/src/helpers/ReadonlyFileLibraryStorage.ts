import { fsImplementations } from '@lumieducation/h5p-server';

export default class ReadonlyFileLibraryStorage extends fsImplementations.FileLibraryStorage {
    constructor(librariesDirectory: string) {
        super(process.cwd());
        this.librariesDirectory = librariesDirectory;
    }
}
