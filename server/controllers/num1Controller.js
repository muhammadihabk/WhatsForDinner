const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

// READ
exports.READ = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        let tempQuery = `SELECT * FROM Dish`;
        connection.query(tempQuery, (err, data) => {
            connection.release();
            if(!err) {
                res.render('index', { data });
                console.log(data);
            } else {
                console.log('err');
            }
        });
    });
};