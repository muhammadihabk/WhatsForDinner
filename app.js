let express = require('express');
let mysql = require('mysql2');

require('dotenv').config();

let app = express();
/* UNDERSTAND */
app.use(express.urlencoded({extended: true}));
app.use(express.json());
/* ^^^^^^^^^^ */
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.listen(3001, () => {
    console.log('Listening on port 3001');
});

app.get('/', (req, res) => {
    res.render('index');
});