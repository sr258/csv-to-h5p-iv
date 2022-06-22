import path from 'path';
import fs from 'fs-extra';
import { withFile } from 'tmp-promise';

import User from '../src/User';
import InteractiveVideoConverter from '../src/InteractiveVideoConverter';

describe('Interactive Video Converter', () => {
    it('initializes and can parse csv', async () => {
        // prepare
        const converter = await InteractiveVideoConverter.create();

        // test
        const result = await converter.parse(
            path.join(__dirname, './__fixtures__/file2.csv')
        );
        expect(result).toMatchSnapshot();
    });

    it('can create IV', async () => {
        // prepare
        const converter = await InteractiveVideoConverter.create();
        const result1 = await converter.parse(
            path.join(__dirname, './__fixtures__/file2.csv')
        );

        // test
        const result2 = result1.generateParameters();
        expect(result2).toMatchSnapshot();
    });

    it('can save IV', async () => {
        // prepare
        const converter = await InteractiveVideoConverter.create();
        const result1 = await converter.parse(
            path.join(__dirname, './__fixtures__/file2.csv')
        );
        const params = result1.generateParameters();
        const { metadata, mainLibraryUbername } = result1.generateMetadata();

        // test
        const contentId = await converter.h5pEditor.saveOrUpdateContent(
            undefined,
            params,
            metadata,
            mainLibraryUbername,
            new User()
        );
        expect(contentId).toBeDefined();

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

    it('can save IV to disk', async () => {
        // prepare
        const converter = await InteractiveVideoConverter.create();
        const result1 = await converter.parse(
            path.join(__dirname, './__fixtures__/file2.csv')
        );
        const params = result1.generateParameters();
        const { metadata, mainLibraryUbername } = result1.generateMetadata();

        // test
        const contentId = await converter.h5pEditor.saveOrUpdateContent(
            undefined,
            params,
            metadata,
            mainLibraryUbername,
            new User()
        );
        const writeStream = fs.createWriteStream(path.resolve('out.h5p'));
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
    });
});
