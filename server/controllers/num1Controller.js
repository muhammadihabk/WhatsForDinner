const mysql = require('mysql2');
const url = require('url');

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

// exports.meal_param = (req, res) => {
//     let reqBody = url.parse(req.url, true).query;
//     console.log(reqBody);
//     if(!('ingredients' in reqBody)) {
//         console.log('meal');

//     } else {
//         console.log('meal_ingredient');
//     }
//     res.send('response')
// };

exports.meal_no_ingredients = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        let tempQuery = ``;
        let randClass = Math.floor(Math.random() * 2);
        let Animal_Seafood = Math.floor(Math.random() * 2);
        if(randClass == 0) {
            Animal_Seafood = 0;
        }
        console.log(req.body);
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
                res.send({ data: data});
            }
        });
    });
};

exports.meal_ingredients = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        let tempQuery = ``;
        let randClass = Math.floor(Math.random() * 2);
        let Animal_Seafood = Math.floor(Math.random() * 2);
        if(randClass == 0) {
            Animal_Seafood = 0;
        }
        console.log(req.body);
        tempQuery = `SELECT d.DishName, i.IngredientName, (i.Price * di.Quantity) AS Price
                        FROM (SELECT d.ID, d.DishName
                                FROM Dish AS d
                                WHERE Class = ?
                                    AND (Animal_Seafood = ? OR Animal_Seafood = 2)
                                ORDER BY RAND()
                                LIMIT 3) AS d
                        INNER JOIN DishIngredient AS di
                            ON d.ID = di.DishID
                        INNER JOIN Ingredient AS i
                            ON i.ID = di.IngredientID;`;
        connection.query(tempQuery, [randClass, Animal_Seafood], (err, data) => {
            connection.release();
            if(err) {
                console.log('error in query');
            } else {
                res.send({ data: data});
            }
        });
    });
};