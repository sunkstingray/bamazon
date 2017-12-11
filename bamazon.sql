DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(100),
	department_name VARCHAR(100),
	price DECIMAL(6,2),
	stock_quantity INTEGER(10),
  product_sales INTEGER(10),
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, product_sales)
VALUES ("Headphones", "Electronics", "79.99", "112", "12345"),
("Television", "Electronics", "559.99", "11", "34567"),
("Shovel", "Lawn and Garden", "19.99", "21", "12435"),
("Bamazon Becho", "Electronics", "89.99", "1997", "43213"),
("Mixer", "Kitchen", "39.99", "112", "12654"),
("Dog Bed", "Pets", "19.99", "8", "7543"),
("Tent", "Outdoor", "119.99", "1", "12349"),
("Basketball", "Sporting Goods", "17.99", "5", "24432"),
("T-Shirt", "Clothing", "9.99", "55", "23455"),
("Beef Jerky", "Food", "9.99", "32", "21345");

CREATE TABLE departments (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100),
  over_head_costs INTEGER(10),
  PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs)
VALUES ("Electronics", "50000"),
("Lawn and Garden", "60000"),
("Kitchen", "30000"),
("Pets", "20000"),
("Outdoor", "70000"),
("Sporting Goods", "40000"),
("Clothing", "15000"),
("Food", "10000");