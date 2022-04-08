const mysql = require('mysql2');

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

// Home
exports.read = (req, res) => {
    res.render('index');
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

exports.meal = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        let tempQuery = ``;
        let randClass = Math.floor(Math.random() * 2);
        let Animal_Seafood = Math.floor(Math.random() * 2);
        if(randClass == 0) {
            Animal_Seafood = 0
        }
         tempQuery = `SELECT d.DishName,
                    CAST(SUM(Ingredient.Price * DishIngredient.Quantity) AS DECIMAL(6,2)) AS Price_ingredient
                    FROM Dish AS d
                    INNER JOIN DishIngredient
                        ON d.ID = DishIngredient.DishID
                    INNER JOIN Ingredient
                        ON Ingredient.ID = DishIngredient.IngredientID
                    WHERE Class = ?
                        AND (Animal_Seafood = ? OR Animal_Seafood = 2)
                    GROUP BY d.DishName
                    ORDER BY RAND()
                    LIMIT 3;`;
        connection.query(tempQuery, [randClass, Animal_Seafood], (err, data) => {
            connection.release();
            if(err) {
                console.log('error in query');
            } else {
                let totalPrice = 0;
                data.forEach(tuple => {
                    totalPrice += parseFloat(tuple.Price_ingredient);
                });
                totalPrice = totalPrice.toFixed(2);
                res.send({ data: data, totalPrice: totalPrice });
            }
        });
    });
};