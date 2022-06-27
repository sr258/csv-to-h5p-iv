import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import open from 'open';
import fileupload from 'express-fileupload';
import InteractiveVideoConverter from './InteractiveVideoConverter';

import './helpers/stringifyOverride';

const app = express();
const port = process.env.PORT ? Number.parseInt(process.env.PORT) : '3000';

const isDev = process.env.NODE_ENV === 'development';

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.use(fileupload());

app.get('/', (req, res) => {
    res.render('home');
});

app.use(
    '/',
    express.static(
        isDev
            ? path.join(__dirname, '../build/public')
            : path.join(__dirname, '../public')
    )
);
app.post('/convert', async (req, res) => {
    try {
        if (!req.files.csv) {
            throw new Error('You must upload a CSV file');
        }
        if (Array.isArray(req.files.csv)) {
            throw new Error('You can only upload one CSV file at a time');
        }

        const csvString = req.files.csv.data.toString();

        const converter = await InteractiveVideoConverter.create();
        const iv = await converter.parse(csvString);
        res.setHeader(
            'Content-disposition',
            `attachment; filename="${encodeURI(iv.title)}.h5p"`
        );
        res.status(200);
        await converter.writeToWritable(iv, res);

        res.end();
    } catch (error) {
        res.render('error', { errorMessage: error.message });
    }
});

app.listen(port, () => {
    console.log(`CSV to H5P Interactive Video Converter`);
    console.log('--------------------------------------');
    console.log(
        `The converter is running. Open your browser and navigate to http://localhost:${port}`
    );
    console.log('Leave this window open until you are finished.');
    console.log(
        'Once you are finished, you can close the window by a) clicking into it b) pressing Ctrl + C on the keyboard.'
    );
    if (!isDev) {
        open(`http://localhost:${port}`);
    }
});
