export const toHtml = (
    text: string,
    options?: {
        noParagraph?: boolean;
    }
) =>
    options?.noParagraph
        ? text.replace(/\r?\n/g, '<br/>')
        : `<p>${text.replace(/\r?\n/g, '<br/>')}</p>`;
