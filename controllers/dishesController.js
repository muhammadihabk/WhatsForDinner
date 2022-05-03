import mysql from 'mysql2/promise';
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

export const dishes = async (req, res) => {
    console.log(req.query);
    let dishClass = Math.floor(Math.random() * 2);
    let animalOrSeafood = Math.floor(Math.random() * 2);
    if(dishClass === 0) {
        animalOrSeafood = 0 ;
    }
    [dishClass, animalOrSeafood] = setParameters(req.query, dishClass, animalOrSeafood);
    const data = await dishesQuery(dishClass, animalOrSeafood);
    res.json(data);
};

export const dishesSearch = async (req, res) => {
    const searchValue = req.body.search;
    let tempQuery = `SELECT d.DishName, i.IngredientName, (i.Price * di.Quantity) Price
                    FROM Dish d
                    INNER JOIN DishIngredient AS di
                        ON d.ID = di.DishID
                    INNER JOIN Ingredient AS i
                        ON i.ID = di.IngredientID
                    WHERE d.DishName LIKE ?;`;
    const data = await pool.query(tempQuery, `%${searchValue}%`, (err) => {
        if(err) {
            console.log('Unsuccessful query');
        }
    });
    res.json(data[0]);
};

export const addDishPage = (req, res) => {
    res.sendFile('/public/html/addDish.html', { root: __dirname });
};

export const ingredientNames = (req, res) => {
    let tempQuery = `SELECT IngredientName
                    FROM Ingredient; `;
    pool.query(tempQuery, (error, data) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
        res.json({data});
    });
};

export const addDish = (req, res) => {
    pool.getConnection((error, connection) => {
        addDishQuery(connection);
    });
};

export const deleteDishPage = (req, res) => {
    res.sendFile('/public/html/deleteDish.html', { root: __dirname });
};

export const deleteDish =  async (req, res) => {
    const dishName = req.body.dishName;
    let tempQuery = `DELETE
                     FROM Dish
                     WHERE DishName = ?;`;
    const queryResult = await pool.query(tempQuery, dishName, (error) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
    });
    if(queryResult[0].affectedRows === 0) {
        res.status(404).end();
    } else {
        res.end();
    }
};

// Helper function
const dishesQuery = async (dishClass, animalOrSeafood) => {
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
    const data = await pool.query(tempQuery, [dishClass, animalOrSeafood], (error) => {
        if(error) {
            console.log('error in query');
        }
    });
    return data[0];
}

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
async function addDishQuery(connection) {
        if(error) {
            console.log(`Couldn't establish connection. ${error}`);
        }
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
        // Ingredient DB table
        const ingredientName = req.body.ingredientName;
        let ingredientId = await insertIngredient(connection, ingredientName);
        // DishIngredients DB table
        const ingredientQuantity = parseInt(req.body.ingredientQuantity);
        insertDishIngredient(connection, dishId, ingredientId, ingredientQuantity);
        connection.release();
        res.end('OK');
}

// Helper function
let insertDish = async (connection, dishName, classNum, Animal_Seafood) => {
    let tempQuery = `INSERT INTO Dish
                    VALUES (NULL, ?, ?, ?);`;
    let queryData = await connection.query(tempQuery, [dishName, classNum, Animal_Seafood], (error) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
    });
    return queryData[0].insertId;
};

// Helper function
const insertIngredient = async (connection, ingredientName) => {
    let tempQuery = `SELECT ID
                    FROM Ingredient
                    WHERE IngredientName = ?;`;
    let queryData = await connection.query(tempQuery, ingredientName, (error) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
    });
    return queryData[0][0].ID;
}

// Helper function
const insertDishIngredient = async (connection, dishId, ingredientId, ingredientQuantity) => {
    let tempQuery = `INSERT INTO DishIngredient
                    VALUES (?, ?, ?);`;
    await connection.query(tempQuery, [dishId, ingredientId, ingredientQuantity], (error) => {
        if(error) {
            console.log(`Database query error. ${error}`);
        }
    });
}