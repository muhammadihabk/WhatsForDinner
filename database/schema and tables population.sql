CREATE DATABASE WhatsForDinner;
USE WhatsForDinner;

-- Table Dish
CREATE TABLE IF NOT EXISTS `WhatsForDinner`.`Dish` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `DishName` VARCHAR(25) NOT NULL,
  `Class` TINYINT NOT NULL,
  `Animal_Seafood` TINYINT NOT NULL,
  PRIMARY KEY (`ID`));

-- Table Ingredient
CREATE TABLE IF NOT EXISTS `WhatsForDinner`.`Ingredient` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `IngredientName` VARCHAR(25) NOT NULL,
  `Price` DECIMAL(6,2) NOT NULL,
  PRIMARY KEY (`ID`));

-- Table DishIngredient
CREATE TABLE IF NOT EXISTS `WhatsForDinner`.`DishIngredient` (
  `DishID` INT NOT NULL,
  `IngredientID` INT NOT NULL,
  `Quantity` DECIMAL(5,3) NOT NULL,
  PRIMARY KEY (`DishID`, `IngredientID`),
  CONSTRAINT `DishIngredient_ibfk_1`
    FOREIGN KEY (`DishID`)
    REFERENCES `WhatsForDinner`.`Dish` (`ID`)
    ON DELETE CASCADE
    ON UPDATE RESTRICT,
  CONSTRAINT `DishIngredient_ibfk_2`
    FOREIGN KEY (`IngredientID`)
    REFERENCES `WhatsForDinner`.`Ingredient` (`ID`)
    ON DELETE CASCADE);

-- Table Dish
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (1,'Fool',0,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (2,'Flafel',0,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (3,'Fried Potato',0,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (4,'Omlet',0,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (5,'Bechamel Pasta',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (6,'Scaloppine',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (7,'Biftek',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (8,'Koshary',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (9,'Waraa Aenab',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (10,'Rice',1,2);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (11,'Tagen Khodar',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (12,'Shrimp',1,1);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (13,'Baltic',1,1);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (14,'Cauliflower',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (15,'Moussaka',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (16,'Stuffed Cabage',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (17,'Spinach',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (18,'Zucchini',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (19,'Okra',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (20,'Pastrami',0,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (21,'Shakshuka',0,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (22,'Roast Beef',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (23,'Pizza',1,2);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (24,'Shawerma',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (25,'Fetta',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (26,'Tagen Basal',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (27,'Moulukhia',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (28,'Lentil Soup',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (29,'Chicken Soup',1,0);
INSERT INTO `Dish` (`ID`,`DishName`,`Class`,`Animal_Seafood`) VALUES (30,'Meat Soup',1,0);

-- Table Ingredient
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (1,'Fool',18.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (2,'Salt',5.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (3,'Egg',1.50);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (4,'Potato',0.42);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (5,'Oil',18.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (6,'Black Pepper',5.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (7,'Butter',25.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (8,'Minced Meat',100.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (9,'Tomato',0.66);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (10,'Milk',14.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (11,'Pasta',8.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (12,'Onion',0.42);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (13,'Chicken Breast',80.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (14,'Flour',10.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (15,'Rice',10.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (16,'Waraa Aenab',50.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (17,'Lentil',8.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (18,'Carrot',0.42);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (19,'Pea',5.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (20,'Zucchini',0.42);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (21,'Bread Crumbs',20.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (22,'cumin',240.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (23,'Shrimp',180.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (24,'Garlic',245.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (25,'Eggplant',1.66);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (26,'Cabage',20.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (27,'Spinach',18.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (28,'Pastrami',200.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (29,'Meat',150.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (30,'Yeast',130.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (31,'Zaatar',622.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (32,'Curry',254.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (33,'Bell Pepper',1.24);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (34,'Mulukhiyah',25.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (35,'Chicken',69.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (36,'Baltic',50.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (38,'Okra',47.00);
INSERT INTO `Ingredient` (`ID`,`IngredientName`,`Price`) VALUES (39,'Tomato Paste',32.00);

-- Table DishIngredient
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (1,1,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (1,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (1,5,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (2,1,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (2,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (2,3,4.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (2,5,0.025);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (3,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (3,4,3.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (3,5,0.025);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (3,7,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (4,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (4,3,2.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (4,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (4,7,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,3,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,7,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,8,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,9,3.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,10,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,11,0.500);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (5,12,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,3,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,10,0.300);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,13,0.330);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,14,0.150);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (6,21,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (7,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (7,8,0.330);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (7,10,0.300);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (7,14,0.150);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (7,21,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (8,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (8,9,3.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (8,12,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (8,15,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (8,17,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (9,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (9,9,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (9,12,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (9,15,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (9,16,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (10,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (10,7,0.020);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (10,15,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,2,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,4,2.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,7,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,9,4.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,18,2.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,19,0.166);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (11,20,2.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (12,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (12,14,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (12,22,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (12,23,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (12,24,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (13,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (13,14,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (13,22,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (13,36,0.500);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (14,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (14,3,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (14,10,0.500);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (14,14,0.200);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (14,22,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (15,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (15,4,2.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (15,9,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (15,12,0.083);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (15,25,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (15,33,3.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (16,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (16,9,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (16,15,0.750);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (16,22,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (16,26,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (17,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (17,9,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (17,12,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (17,15,0.150);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (17,27,0.500);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (18,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (18,9,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (18,20,3.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (19,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (19,9,6.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (19,38,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (20,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (20,3,4.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (20,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (20,28,0.125);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (21,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (21,3,4.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (21,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (21,9,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (21,12,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (22,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (22,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (22,29,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (23,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (23,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (23,31,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (23,30,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (23,14,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (23,39,0.025);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (24,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (24,9,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (24,12,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (24,14,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (24,32,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (24,33,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (25,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (25,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (25,9,5.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (25,15,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (25,29,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (26,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (26,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (26,12,12.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (26,5,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (27,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (27,34,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (28,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (28,11,0.500);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (28,12,1.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (28,17,0.500);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (28,18,3.000);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (29,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (29,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (29,35,0.250);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (30,2,0.003);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (30,6,0.005);
INSERT INTO `DishIngredient` (`DishID`,`IngredientID`,`Quantity`) VALUES (30,29,0.250);