import papa from 'papaparse';
import fs from 'fs/promises';

import Converter from './Converter';
import InteractiveVideo from './content-types/InteractiveVideo';

export default class InteractiveVideoConverter extends Converter {
    public static create = async (): Promise<InteractiveVideoConverter> => {
        const converter = new InteractiveVideoConverter();
        await converter.init();
        return converter;
    };

    public parse = async (csvFile: string) => {
        let unparsedCsv: string;
        try {
            unparsedCsv = await fs.readFile(csvFile, {
                encoding: 'utf-8'
            });
        } catch (error) {
            throw new Error(
                `There was an error while reading the file ${csvFile}: ${error.message}`
            );
        }
        const parsedCsv = papa.parse(unparsedCsv, {
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
}
