export const toHtml = (
    text: string,
    options?: {
        paragraph?: 'div' | 'p' | 'none';
    }
) => {
    if (options?.paragraph === undefined || options.paragraph === 'p') {
        return `<p>${text.replace(/\r?\n/g, '<br/>')}</p>`;
    } else if (options.paragraph === 'div') {
        return `<div>${text.replace(/\r?\n/g, '<br/>')}</div>`;
    } else if (options.paragraph === 'none') {
        return text.replace(/\r?\n/g, '<br/>');
    } else {
        throw new Error('Invalid options.paragraph parameter');
    }
};

export const markdownLinkToHtml = (text: string) =>
    text.replace(
        /\[(.*?)\]\((.*?)\)/,
        (matchedText, group1, group2) => `<a href="${group2}">${group1}</a>`
    );
