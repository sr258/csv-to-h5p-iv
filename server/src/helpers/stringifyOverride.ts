// We override the default JSON.stringify function to encode UTF-8 strings like
// this: \u300a We should do this in h5p-nodejs-library in the future, but I'm
// unsure if this drastic approach has negative side effects.

function jsonEscapeUTF(s) {
    return s.replace(
        /[^\x20-\x7F]/g,
        (x) => '\\u' + ('000' + x.codePointAt(0).toString(16)).slice(-4)
    );
}

const oldStringify = JSON.stringify;

JSON.stringify = (value, replacer, space) => {
    const ret = oldStringify(value, replacer, space);
    return jsonEscapeUTF(ret);
};
