export const toHtml = (
    text: string,
    options?: {
        noParagraph?: boolean;
    }
) =>
    options?.noParagraph
        ? text.replace(/\r?\n/g, '<br/>')
        : `<p>${text.replace(/\r?\n/g, '<br/>')}</p>`;

export const markdownLinkToHtml = (text: string) =>
    text.replace(
        /\[(.*?)\]\((.*?)\)/,
        (matchedText, group1, group2) => `<a href="${group2}">${group1}</a>`
    );
