import InteractiveVideoInteraction from './InteractiveVideoInteraction';
import { createInteractiveVideoInteractionFromRow } from './InteractiveVideoInteractionFactory';

export default class InteractiveVideo {
    public title: string;
    public mediaLink: string;
    public interactions: InteractiveVideoInteraction[];

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

        const title = rows[0][1]?.trim();
        if (!title || title === '') {
            throw new Error('Missing video title');
        }

        const link = rows[1][1]?.trim();
        if (!link || link === '') {
            throw new Error('Missing video link');
        }

        iv.title = title;
        iv.mediaLink = link;
        iv.interactions = rows.slice(3).map((val, index) => {
            try {
                return createInteractiveVideoInteractionFromRow(val);
            } catch (error) {
                throw new Error(`Error in row ${index + 3}: ${error}`);
            }
        });

        return iv;
    }
}
