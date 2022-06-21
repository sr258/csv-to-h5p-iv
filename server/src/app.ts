import express from 'express';
import path from 'path';
import { engine } from 'express-handlebars';

const app = express();
const port = process.env.PORT ? Number.parseInt(process.env.PORT) : '3000';

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, './views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.use(express.static(path.join(__dirname, '../build/public')));
app.use(
    '/scripts/alpinejs/',
    express.static(path.join(__dirname, '../node_modules/alpinejs/dist'))
);

app.listen(port, () => {
    console.log(`csv-to-h5p-iv running on http://localhost:${port}`);
});
