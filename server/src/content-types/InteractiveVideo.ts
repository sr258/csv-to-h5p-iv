import { IContentMetadata } from '@lumieducation/h5p-server';

import { toSeconds } from '../helpers/timecode';
import InteractiveVideoTemplate from '../templates/InteractiveVideoTemplate';
import InteractiveVideoInteraction from './InteractiveVideoInteraction';
import { createInteractiveVideoInteractionFromRow } from './InteractiveVideoInteractionFactory';

export default class InteractiveVideo {
    public title: string;
    public mediaLink: string;
    public submitScreenTimecode: string;
    public submitScreenSeconds: number;
    public interactions: InteractiveVideoInteraction[];
    public template = InteractiveVideoTemplate;

    public static fromCsvRows(rows: string[][]): InteractiveVideo {
        const iv = new InteractiveVideo();
        if (!rows[0] || rows[0][0]?.trim() !== 'Title:') {
            throw new Error(
                'Invalid CSV file format (no "Title" caption in row 1 column 1)'
            );
        }
        if (!rows[1] || rows[1][0]?.trim() !== 'YouTube link:') {
            throw new Error(
                'Invalid CSV file format (no "YouTube link" caption in row 2 column 1)'
            );
        }

        if (!rows[2] || rows[2][0]?.trim() !== 'Submit screen at:') {
            throw new Error(
                'Invalid CSV file format (no "Submit screen at:" caption in row 3 column 1)'
            );
        }

        const title = rows[0][1]?.trim();
        if (!title || title === '') {
            throw new Error('Missing video title');
        }

        const link = rows[1][1]?.trim();
        if (!link || link === '') {
            throw new Error('Missing video link');
        }

        const submitScreenTimecode = rows[2][1]?.trim();
        if (!submitScreenTimecode || submitScreenTimecode === '') {
            throw new Error('Missing submit screen timecode');
        }

        iv.title = title;
        iv.mediaLink = link;
        iv.submitScreenTimecode = submitScreenTimecode;
        iv.submitScreenSeconds = toSeconds(submitScreenTimecode);
        iv.interactions = rows.slice(4).map((val, index) => {
            try {
                return createInteractiveVideoInteractionFromRow(val);
            } catch (error) {
                throw new Error(`Error in row ${index + 3}: ${error}`);
            }
        });

        return iv;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public generateParameters(): any {
        return this.template(this);
    }

    public generateMetadata(): {
        metadata: IContentMetadata;
        mainLibraryUbername: string;
    } {
        return {
            metadata: {
                embedTypes: ['div'],
                language: 'en',
                title: this.title,
                mainLibrary: 'H5P.InteractiveVideo',
                license: 'U',
                defaultLanguage: 'en',
                preloadedDependencies: [
                    {
                        machineName: 'H5P.InteractiveVideo',
                        majorVersion: 1,
                        minorVersion: 24
                    }
                ]
            },
            mainLibraryUbername: 'H5P.InteractiveVideo 1.24'
        };
    }
}
