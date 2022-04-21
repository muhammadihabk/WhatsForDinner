import express from 'express';
import 'dotenv/config.js'
import dishes from './routes/dishes.js';

let app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index');
});

app.use('/app', dishes);

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log(`Listening on port ${listener.address().port}`);
});