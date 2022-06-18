import Converter from '../src/Converter';

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
});
