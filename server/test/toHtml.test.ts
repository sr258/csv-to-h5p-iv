import { markdownLinkToHtml } from '../src/helpers/html';

describe('toHtml', () => {
    it('converts markdown links to HTML', () => {
        expect(
            markdownLinkToHtml('Go to [Link text](linkurl) to learn more!')
        ).toEqual('Go to <a href="linkurl">Link text</a> to learn more!');
    });
});
