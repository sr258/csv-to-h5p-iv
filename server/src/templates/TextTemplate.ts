import { createUUID } from '../helpers/uuid';
import Text from '../content-types/Text';

export default (data: Text) => [
    {
        x: 0,
        y: 0,
        width: 40,
        height: 19.213973799126638,
        duration: {
            from: 1,
            to: 1
        },
        libraryTitle: 'Text',
        action: {
            library: 'H5P.Text 1.1',
            params: {
                text: data.text
            },
            subContentId: createUUID(),
            metadata: {
                contentType: 'Text',
                license: 'U',
                title: data.title,
                authors: [],
                changes: []
            }
        },
        pause: true,
        displayType: 'poster',
        buttonOnMobile: false,
        visuals: {
            backgroundColor: 'rgb(255, 255, 255)',
            boxShadow: true
        },
        goto: {
            url: {
                protocol: 'http://'
            },
            visualize: false,
            type: 'timecode',
            time: data.start
        },
        label: ''
    },
    {
        x: 0,
        y: 85.3954391072295,
        width: 40,
        height: 3.274585152838428,
        duration: {
            from: 1,
            to: 1
        },
        libraryTitle: 'Text',
        action: {
            library: 'H5P.Text 1.1',
            params: {
                text: '<p style="text-align:center"><strong>Next</strong></p>\n'
            },
            subContentId: createUUID(),
            metadata: {
                contentType: 'Text',
                license: 'U',
                title: 'Next Button',
                authors: [],
                changes: []
            }
        },
        pause: true,
        displayType: 'poster',
        buttonOnMobile: false,
        visuals: {
            backgroundColor: 'rgb(182, 215, 168)',
            boxShadow: false
        },
        goto: {
            url: {
                protocol: 'http://'
            },
            visualize: true,
            type: 'timecode',
            time: data.start
        },
        label: '<p style="text-align:center">Next</p>\n'
    }
];