// Based on: https://github.com/lumieducation/h5p-nodejs-library/blob/66502a3403ed61a9f7c2339fc603f3f5189bb0b4/packages/h5p-examples/h5p/core/js/h5p.js#L2283-L2293
// GPL-3.0

export const createUUID = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function (char) {
            const random = (Math.random() * 16) | 0;
            const newChar = char === 'x' ? random : (random & 0x3) | 0x8;
            return newChar.toString(16);
        }
    );
};
