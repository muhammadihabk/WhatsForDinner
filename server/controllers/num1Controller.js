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

// exports.meal_no_ingredients = (req, res) => {
//     pool.getConnection((err, connection) => {
//         if(err) { throw err }
//         console.log("connected as ID: " + connection.threadId);
//         let dishClass = Math.floor(Math.random() * 2);
//         let animalOrSeafood = Math.floor(Math.random() * 2);
//         if(dishClass === 0) {
//             animalOrSeafood = 0 ;
//         }
//         [dishClass, animalOrSeafood] = setParameters(req.body, dishClass, animalOrSeafood);
//         let tempQuery = `SELECT d.DishName,
//                          CAST(SUM(Ingredient.Price * DishIngredient.Quantity) AS DECIMAL(6,2)) AS Price_ingredient
//                          FROM Dish AS d
//                          INNER JOIN DishIngredient
//                             ON d.ID = DishIngredient.DishID
//                          INNER JOIN Ingredient
//                             ON Ingredient.ID = DishIngredient.IngredientID
//                          WHERE Class = ?
//                             AND (Animal_Seafood = ? OR Animal_Seafood = 2)
//                          GROUP BY d.DishName
//                          ORDER BY RAND()
//                          LIMIT 3;`;
//         connection.query(tempQuery, [dishClass, animalOrSeafood], (err, data) => {
//             connection.release();
//             if(err) {
//                 console.log('error in query');
//             } else {
//                 let totalPrice = 0;
//                 data.forEach(tuple => {
//                     totalPrice += parseFloat(tuple.Price_ingredient);
//                 });
//                 totalPrice = totalPrice.toFixed(2);
//                 console.log('No ingredients');
//                 console.log(data);
//                 res.send({ data: data});
//             }
//         });
//     });
// };

exports.generateMeal = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        let dishClass = Math.floor(Math.random() * 2);
        let animalOrSeafood = Math.floor(Math.random() * 2);
        if(dishClass === 0) {
            animalOrSeafood = 0 ;
        }
        [dishClass, animalOrSeafood] = setParameters(req.body, dishClass, animalOrSeafood);
        let tempQuery = `SELECT d.DishName, i.IngredientName, (i.Price * di.Quantity) AS Price
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
        connection.query(tempQuery, [dishClass, animalOrSeafood], (err, data) => {
            connection.release();
            if(err) {
                console.log('error in query');
            } else {
                res.send({ data: data});
            }
        });
    });
};

// Helper function
// By default parameters are
// dishClass = 0 and animalOrSeafood = 0
let setParameters = (parameters, dishClass, animalOrSeafood) => {
    Object.entries(parameters).forEach(([key, value]) => {
        if(value.toLowerCase() === 'light') {
            dishClass = 0;
            animalOrSeafood = 0;
        } else if(value.toLowerCase() === 'heavy') {
            dishClass = 1;
            animalOrSeafood = Math.floor(Math.random() * 2);
        } else if(value.toLowerCase() === 'animal') {
            dishClass = 1;
            animalOrSeafood = 0;
        } else if(value.toLowerCase() === 'seafood') {
            dishClass = 1;
            animalOrSeafood = 1;
        }
    });
    return [dishClass, animalOrSeafood];
};