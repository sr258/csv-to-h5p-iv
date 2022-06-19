import path from 'path';
import fs from 'fs-extra';
import { withFile } from 'tmp-promise';

import Converter from '../src/Converter';
import User from '../src/User';

describe('basic tests', () => {
    it('initializes and can list libraries', async () => {
        // prepare
        const converter = await Converter.create();

        // test
        await expect(
            converter.libraryStorage.getInstalledLibraryNames()
        ).resolves.toMatchSnapshot();
    });

    it('initializes and has functional content storage', async () => {
        // prepare
        const converter = await Converter.create();

        // test
        await expect(
            converter.contentStorage.listContent()
        ).resolves.toMatchObject([]);
    });

    it('initializes and has functional temporary storage', async () => {
        // prepare
        const converter = await Converter.create();

        // test
        await expect(
            converter.temporaryStorage.listFiles()
        ).resolves.toMatchObject([]);
    });

    it('can save static content, regenerate the full metadata and export it to .h5p', async () => {
        // prepare
        const converter = await Converter.create();
        const params = await fs.readJSON(
            path.join(__dirname, './__fixtures__/static-params.json')
        );
        const originalMetadata = await fs.readJSON(
            path.join(__dirname, './__fixtures__/static-metadata-reduced.json')
        );

        // test
        const contentId = await converter.h5pEditor.saveOrUpdateContent(
            undefined,
            params,
            originalMetadata,
            'H5P.Blanks 1.14',
            new User()
        );
        expect(contentId).toBeDefined();
        const content = await converter.h5pEditor.getContent(contentId);

        // The replacer sorts the keys of the object
        // (https://stackoverflow.com/a/43636793/3324376)
        const replacer = (key, value) =>
            value instanceof Object && !(value instanceof Array)
                ? Object.keys(value)
                      .sort()
                      .reduce((sorted, key) => {
                          sorted[key] = value[key];
                          return sorted;
                      }, {})
                : value;

        // We compare equality of the objects by stringifying them as the
        // toMatchObject doesn't work (compares object equality, which is not
        // the case here)
        expect(JSON.stringify(content.params.params, replacer, 2)).toEqual(
            JSON.stringify(params, replacer, 2)
        );
        expect(JSON.stringify(content.params.metadata, replacer, 2)).toEqual(
            JSON.stringify(
                await fs.readJSON(
                    path.join(__dirname, './__fixtures__/static-metadata.json')
                ),
                replacer,
                2
            )
        );

        await withFile(
            async (tmpResult) => {
                const writeStream = fs.createWriteStream(tmpResult.path);
                const packageFinishedPromise = new Promise<void>((resolve) => {
                    writeStream.on('close', () => {
                        resolve();
                    });
                });
                await converter.h5pEditor.exportContent(
                    contentId,
                    writeStream,
                    new User()
                );
                await packageFinishedPromise;
                writeStream.close();
            },
            {
                keep: false
            }
        );
    });
});
