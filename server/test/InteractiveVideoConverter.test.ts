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
});
