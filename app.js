let express = require('express');
let mysql = require('mysql2');
require('dotenv').config();

let app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

const dishes = require('./routes/dishes');
app.get('/', (req, res) => {
    res.render('index');
});

app.use('/app', dishes);

app.listen(3000, () => {
    console.log('Listening on port 3000');
});