import papa from 'papaparse';
import { Writable } from 'stream';

import Converter from './Converter';
import InteractiveVideo from './content-types/InteractiveVideo';
import User from './User';

export default class InteractiveVideoConverter extends Converter {
    public static create = async (): Promise<InteractiveVideoConverter> => {
        const converter = new InteractiveVideoConverter();
        await converter.init();
        return converter;
    };

    public parse = async (csvText: string) => {
        const parsedCsv = papa.parse(csvText, {
            header: false,
            delimiter: ';',
            skipEmptyLines: true
        });

        if (parsedCsv.meta.aborted) {
            throw new Error('The CSV could not be parsed');
        }

        if (parsedCsv.errors && parsedCsv.errors.length > 0) {
            throw new Error(
                `There were errors while parsing the CSV: ${parsedCsv.errors
                    .map((e) => `Row ${e.row} ${e.type} ${e.code} ${e.message}`)
                    .join(' ')}`
            );
        }

        // Filter empty rows
        const data = parsedCsv.data.filter((row: string[]) =>
            row.some((cell) => cell != '')
        );

        return InteractiveVideo.fromCsvRows(data as string[][]);
    };

    public writeToWritable = async (
        iv: InteractiveVideo,
        writable: Writable
    ) => {
        const params = iv.generateParameters();
        const { metadata, mainLibraryUbername } = iv.generateMetadata();

        const contentId = await this.h5pEditor.saveOrUpdateContent(
            undefined,
            params,
            metadata,
            mainLibraryUbername,
            new User()
        );
        const packageFinishedPromise = new Promise<void>((resolve) => {
            writable.on('close', () => {
                resolve();
            });
        });
        await this.h5pEditor.exportContent(contentId, writable, new User());
        await packageFinishedPromise;
        await this.h5pEditor.deleteContent(contentId, new User());
    };
}
