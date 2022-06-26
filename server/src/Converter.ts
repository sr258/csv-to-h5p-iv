import * as path from 'path';
import { dir } from 'tmp-promise';
import {
    H5PEditor,
    ILibraryStorage,
    IContentStorage,
    ITemporaryFileStorage,
    IKeyValueStorage,
    fsImplementations,
    H5PConfig,
    H5PPlayer
} from '@lumieducation/h5p-server';
import type { DirectoryResult } from 'tmp-promise';
import ReadonlyFileLibraryStorage from './helpers/ReadonlyFileLibraryStorage';

export default class Converter {
    protected constructor() {
        return;
    }

    public contentStorage: IContentStorage;
    public libraryStorage: ILibraryStorage;
    public temporaryStorage: ITemporaryFileStorage;
    public h5pEditor: H5PEditor;
    public h5pPlayer: H5PPlayer;

    protected contentDir: DirectoryResult;
    protected generalPurposeCache: IKeyValueStorage;
    protected h5pConfig: H5PConfig;
    protected temporaryDir: DirectoryResult;

    public static create = async (): Promise<Converter> => {
        const converter = new Converter();
        await converter.init();
        return converter;
    };

    protected init = async () => {
        this.generalPurposeCache = new fsImplementations.InMemoryStorage();
        this.libraryStorage = new ReadonlyFileLibraryStorage(
            path.join(__dirname, '../h5p-libraries')
        );
        this.contentDir = await dir({
            keep: false,
            unsafeCleanup: true
        });
        this.contentStorage = new fsImplementations.FileContentStorage(
            this.contentDir.path
        );
        this.temporaryDir = await dir({
            keep: false,
            unsafeCleanup: true
        });
        this.temporaryStorage =
            new fsImplementations.DirectoryTemporaryFileStorage(
                this.temporaryDir.path
            );
        this.h5pConfig = new H5PConfig(undefined, {
            contentHubEnabled: false,
            contentUserStateSaveInterval: false,
            platformName: 'csv-to-h5p-iv',
            platformVersion: '0.1.0',
            sendUsageStatistics: false,
            setFinishedEnabled: false,
            siteType: 'local',
            uuid: '8de62c47-f335-42f6-909d-2d8f4b7fb7f5'
        });

        this.h5pEditor = new H5PEditor(
            this.generalPurposeCache,
            this.h5pConfig,
            this.libraryStorage,
            this.contentStorage,
            this.temporaryStorage
        );
        this.h5pPlayer = new H5PPlayer(
            this.libraryStorage,
            this.contentStorage,
            this.h5pConfig
        );
    };

    public destroy = async () => {
        await this.contentDir?.cleanup();
        await this.temporaryDir?.cleanup();
    };
}
