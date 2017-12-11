// Required npm Modules
var mysql = require("mysql");
var inquirer = require("inquirer");
var columnify = require('columnify')
var chalk = require("chalk");

// Create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon"
});

// Connect to the mysql server
connection.connect(function(err) {
    if (err) throw err;

    startMenu();
});

// Function to show starting menu
function startMenu() {

    console.log(chalk.bold.inverse("\n\n Bamazon Manager \n"));

    inquirer.prompt([
        {
            type: "list",
            name: "menuChoice",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Quit Bamazon Manager"],
            message: "Please choose an option:"
        }
      ])
      .then(function(answer) {
            switch(answer.menuChoice) {
                case "View Products for Sale":
                    viewProducts();
                break;
                case "View Low Inventory":
                    viewLow();
                    break;
                case "Add to Inventory":
                    addInventory();
                    break;
                case "Add New Product":
                    addNew();
                    break;
                case "Quit Bamazon Manager":
                    connection.end();
                    console.log(chalk.bold.yellow("\nGoodbye!\n"));
                    break;
            }
        })
}


// function to view products
function viewProducts() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        console.log(chalk.bold.yellow("\nYou are now viewing available products...\n"));
        console.log(columnify(results));
        console.log("\n");

        startMenu();
    })
}


// Function to view low inventory
function viewLow() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, results) {
        if (err) throw err;

        console.log(chalk.bold.yellow("\nYou are now viewing products with low inventory levels...\n"));
        console.log(columnify(results));
        console.log("\n");

        startMenu();
    })
}


// Function to add inventory
function addInventory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        var idList = [];

        for (var i = 0; i < results.length; i++) {
            idList.push(results[i].item_id.toString());
        }

        console.log("\n");
        console.log(columnify(results, {minWidth: 20}));
        console.log("\n");

        inquirer.prompt([
            {
                type: "list",
                name: "item",
                choices: idList,
                message: "Which item would you like to add inventory to?"
            },
            {
                type: "input",
                name: "quantity",
                message: "What quantity would you like to add?"
            }
      ])
      .then(function(answer) {

            connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.item], function(err, results) {
                if (err) throw err;
                var currentQty = results[0].stock_quantity;

                currentQty += parseInt(answer.quantity);

                connection.query("UPDATE products SET stock_quantity = ?  WHERE item_id = ?", [currentQty, answer.item], function(err, results) {
                    if (err) throw err;
            
                    console.log(chalk.bold.yellow("\nThe inventory for item " + answer.item + " has been updated to " + currentQty + "."));
            
                    startMenu();

                }) 
            })

          

        })
    })
}

// Function to add product
function addNew() {
    inquirer.prompt([
        {
            type: "input",
            name: "item",
            message: "Product name:"
        },
        {
            type: "input",
            name: "department",
            message: "What department is this product in:"
        },
        {
            type: "input",
            name: "price",
            message: "What is the price per item:"
        },
        {
            type: "input",
            name: "stock",
            message: "What is the initial stock quantity:"
        },
    ])
    .then(function(answer) {

        connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [answer.item, answer.department, answer.price, answer.stock], function(err, results) {
            if (err) throw err;
        
            console.log(chalk.bold.yellow("\nThe item " + answer.item + " has been added to the product list."));
        
            startMenu();
       
        })

    })
}