import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';
import open from 'open';

const app = express();
const port = process.env.PORT ? Number.parseInt(process.env.PORT) : '3000';

const isDev = process.env.NODE_ENV === 'development';

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

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
    open(`http://localhost:${port}`);
});
