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
    console.log(`csv-to-h5p-iv running on http://localhost:${port}`);
    open(`http://localhost:${port}`);
});
