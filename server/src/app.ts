import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import open from 'open';
import fileupload from 'express-fileupload';
import InteractiveVideoConverter from './InteractiveVideoConverter';

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
    if (!req.files.csv) {
        res.status(400).send('You must upload a CSV file');
    }
    if (Array.isArray(req.files.csv)) {
        res.status(400).send('You can only upload one CSV file at a time');
        return;
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
});

app.listen(port, () => {
    console.log(`csv-to-h5p-iv running on http://localhost:${port}`);
    open(`http://localhost:${port}`);
});
