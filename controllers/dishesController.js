import mysql from 'mysql2';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
let __dirname = dirname(__filename);
__dirname = path.resolve();

const pool = mysql.createPool({
    connectionLimit: 5,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB,
    password: process.env.DB_PASSWORD
});

export const generateMeal = (req, res) => {
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
                res.json({data});
            }
        });
    });
};

export const search = (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) { throw err }
        console.log("connected as ID: " + connection.threadId);
        const searchValue = req.body.search;
        let tempQuery = `SELECT d.DishName, i.IngredientName, (i.Price * di.Quantity) Price
                        FROM Dish d
                        INNER JOIN DishIngredient AS di
                            ON d.ID = di.DishID
                        INNER JOIN Ingredient AS i
                            ON i.ID = di.IngredientID
                        WHERE d.DishName LIKE ?;`;
        connection.query(tempQuery, `%${searchValue}%`, (err, data) => {
            connection.release();
            if(err) {
                console.log('Unsuccessful query');
            } else {
                res.json({data});
            }
        });
    });
};

export const addDishPage = (req, res) => {
    res.sendFile('/public/html/addDish.html', { root: __dirname });
};

export const ingredientNames = (req, res) => {
    pool.getConnection((error, connection) => {
        if(error) { throw error }
        console.log("connected as ID: " + connection.threadId);
        console.log(req.body);
        let tempQuery = `SELECT IngredientName
                        FROM Ingredient; `;
        connection.query(tempQuery, (error, data) => {
            if(error) {
                console.log(`Database query error. ${error}`);
            }
            res.json({data});
            connection.release;
        });
    });
};

export const addDish = (req, res) => {
    pool.getConnection((error, connection) => {
        doQueries(error, connection, req);
    });
    res.end();
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

// Helper function
let insertDish = async (connection, dishName, classNum, Animal_Seafood) => {
    let dishId = 0;
    let tempQuery = `INSERT INTO Dish
                    VALUES (NULL, ?, ?, ?);`;
    await connection.promise().query(tempQuery, [dishName, classNum, Animal_Seafood], (error, data) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
        console.log(`data.insertId from Dish query:\n`);
        console.log(data.insertId);
        dishId = data.insertId;
        console.log(`dishId before exiting query`);
        console.log(dishId);
    });
    return dishId;
};


// Helper function
const insertIngredient = async (connection, ingredientName, ingredientPrice) => {
    let ingredientId = 0;
    let tempQuery = `INSERT INTO Ingredient
                    VALUES (NULL, ?, ?);`;
    await connection.promise().query(tempQuery, [ingredientName, ingredientPrice], (error, data) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
        console.log(`data.insertId from Ingredient query:\n`);
        console.log(data.insertId);
        ingredientId = data.insertId;
        console.log(`ingredientId before exiting query`);
        console.log(ingredientId);
    });
    return ingredientId;
}

// Helper function
const insertDishIngredient = async (connection, dishId, ingredientId, ingredientQuantity) => {
    let tempQuery = `INSERT INTO DishIngredient
                    VALUES (?, ?, ?);`;
    console.log(`dishId after query`);
    console.log(dishId);
    console.log(`ingredientId after query`);
    console.log(ingredientId);
    await connection.promise().query(tempQuery, [dishId, ingredientId, ingredientQuantity], (error, data) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
        console.log(`data from dishIngredient query`);
        console.log(data);
    });
}

// Helper function
const doQueries = async (error, connection, req) => {
    if(error) { throw error }
        console.log("connected as ID: " + connection.threadId);
        console.log(`req.body`);
        console.log(req.body);
        // Dish DB table
        const dishName = req.body.dishName;
        let classNum = 0;
        let Animal_Seafood =  2;
        if(req.body.light_heavy === 'heavy') {
            classNum =  1;
        }
        if(req.body.animal_seafood === 'animal') {
            Animal_Seafood =  0;
        } else if(req.body.animal_seafood === 'seafood') {
            Animal_Seafood =  1;
        }
        let dishId = await insertDish(connection, dishName, classNum, Animal_Seafood);
        console.log(`dishId after let in doQueries`);
        console.log(dishId);
        // Ingredient DB table
        const ingredientName = req.body.ingredientName;
        const ingredientPrice = req.body.ingredientPrice;
        let ingredientId = await insertIngredient(connection, ingredientName, ingredientPrice);
        console.log(`ingredientId after let in doQueries`);
        console.log(ingredientId);
        // DishIngredients DB table
        const ingredientQuantity = req.body.ingredientQuantity;
        await insertDishIngredient(connection, dishId, ingredientId, ingredientQuantity);
        connection.release;
}