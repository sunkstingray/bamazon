DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL(6,2),
	stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Headphones", "Electronics", "79.99", "112"),
("Television", "Electronics", "559.99", "11"),
("Shovel", "Lawn and Garden", "19.99", "21"),
("Bamazon Becho", "Electronics", "89.99", "1997"),
("Mixer", "Kitchen", "39.99", "112"),
("Dog Bed", "Pets", "19.99", "8"),
("Tent", "Outdoor", "119.99", "1"),
("Basketball", "Sporting Goods", "17.99", "5"),
("T-Shirt", "Clothing", "9.99", "55"),
("Beef Jerky", "Food", "9.99", "32");