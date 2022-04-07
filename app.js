let express = require('express');
let mysql = require('mysql2');

require('dotenv').config();

let app = express();
/* UNDERSTAND */
app.use(express.urlencoded({extended: false}));
app.use(express.json());
/* ^^^^^^^^^^ */
app.use(express.static('public'));
app.set('view engine', 'ejs');


const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

pool.getConnection((err, connection) => {
    if(err) { throw err }
    console.log("connected as ID: " + connection.threadId);
});

const num1 = require('./server/routes/num1');
app.use('/', num1);

app.listen(3001, () => {
    console.log('Listening on port 3001');
});