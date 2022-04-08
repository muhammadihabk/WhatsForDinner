const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

// READ
exports.read = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        /**
         * Generate rand num from [0,1] for class
         * if 0
         *      do light query
         * else
         *      generate rand num from [0,1]
         *      Do heavy query
         * 
         */
         let randClass = Math.floor(Math.random() * 1);
         let tempQuery = ``;
         tempQuery = `SELECT d.DishName,
         SUM(Ingredient.Price * DishIngredient.Quantity) AS Price_ingredient
         FROM Dish AS d
         INNER JOIN DishIngredient
             ON d.ID = DishIngredient.DishID
         INNER JOIN Ingredient
             ON Ingredient.ID = DishIngredient.IngredientID
         WHERE Class = 0
         GROUP BY d.DishName
         ORDER BY RAND()
         LIMIT 3;`;
        connection.query(tempQuery, (err, data) => {
            connection.release();
            if(err) {
                console.log('error in query');
            } else {
                let totalPrice = 0;
                data.forEach(tuple => {
                    totalPrice += tuple.Price_ingredient;
                });
                res.render('index', { data: data, totalPrice: totalPrice });
                console.log(data);
            }
        });
    });
};

exports.find = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        let searchValue = req.body.search;
        let tempQuery = `SELECT * FROM Dish WHERE DishName LIKE ?`;
        connection.query(tempQuery, `%${searchValue}%`, (err, data) => {
            connection.release();
            if(err) {
                console.log('Unsuccessful query');
            } else {
                res.render('index', { data });
            }
        });
    });
};

exports.add = (req, res) => {
    res.render('add-dish');
};