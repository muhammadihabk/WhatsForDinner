import express from 'express';
import 'dotenv/config.js'
import dishes from './routes/dishes.js';

let app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/app', dishes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});