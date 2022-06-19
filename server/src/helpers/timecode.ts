/*
Based on https://github.com/h5p/h5p-editor-timecode/blob/master/timecode.js#L61

(The MIT License)

Copyright (c) 2015 Joubel AS

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Converts seconds to timecode.
 *
 * @private
 * @param {Number} seconds
 * @returns {String}
 */
export const toTimecode = (seconds: number): string => {
    let time = '';
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    minutes = minutes % 60;
    seconds = Math.floor((seconds % 60) * 1000) / 1000;

    if (hours !== 0) {
        time += hours + ':';

        if (minutes < 10) {
            // Leading zero
            time += '0';
        }
    }

    time += minutes + ':';

    if (seconds < 10) {
        // Leading zero
        time += '0';
    }

    time += seconds;

    return time;
};

/**
 * Converts seconds to timecode.
 *
 * @private
 * @param {Number} seconds
 * @returns {String}
 */
export const toSeconds = (timecode: string): number => {
    if (timecode.indexOf(':') == -1) {
        timecode = '0:' + timecode;
    }
    // Split time format and check that we have between one and two colons.
    const values = timecode.split(':', 4);
    if (values.length !== 2 && values.length !== 3) {
        throw new Error(`Invalid timecode: ${timecode}`);
    }

    // Validate seconds and add to value
    const allowedChars = new RegExp('^[0-9]+$');
    let j = values.length - 1;

    let seconds = parseFloat(values[j]);
    if (
        !values[j].match(/^[0-9]{2}$|\.[0-9]{1,3}$/) ||
        seconds >= 60 ||
        seconds < 0
    ) {
        throw new Error(`Invalid timecode: ${timecode}`);
    }

    // Validate minutes
    j = j - 1;
    const minutes = parseInt(values[j]);
    if (
        !values[j].match(allowedChars) ||
        (values[j - 1] !== undefined && values[j].length !== 2) ||
        (values[j - 1] === undefined &&
            values[j].length !== (minutes + '').length) ||
        minutes > 59
    ) {
        throw new Error(`Invalid timecode: ${timecode}`);
    }
    // Convert to seconds and add to value
    seconds += minutes * 60;

    // Validate hours
    j = j - 1;
    if (values[j] !== undefined) {
        const hours = parseInt(values[j]);
        if (
            !values[j].match(allowedChars) ||
            values[j].length !== (hours + '').length ||
            hours < 1
        ) {
            throw new Error(`Invalid timecode: ${timecode}`);
        }
        // Convert to seconds and add to value
        seconds += hours * 3600;
    }

    return seconds;
};
