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
  	showData();
});

// Function to show data
function showData() {
	connection.query("SELECT * FROM products", function(err, results) {
    	if (err) throw err;

    	var idList = [];

    	for (var i = 0; i < results.length; i++) {
    	idList.push(results[i].item_id.toString());
    	}

    	console.log(chalk.bold.inverse("\n\n Bamazon Customer \n"));

    	console.log("\n");
    	console.log(columnify(results, {minWidth: 20}));
    	console.log("\n");

    	inquirer.prompt([
        	{
         		type: "list",
          		name: "item",
          		choices: idList,
          		message: "Which item would you like to buy?"
        	},
        	{
          		type: "input",
          		name: "quantity",
          		message: "What quantity would you like to purchase?"
        	}
      	])
    	.then(function(answer) {
			placeOrder(answer.item, answer.quantity);
        })
    })
}


// Function to place an order
function placeOrder(id, qty) {
	connection.query("SELECT * FROM products WHERE item_id = ?", [id], function(err, results) {
    	if (err) throw err;

    	var currentQty = parseFloat(results[0].stock_quantity);
    	var itemPrice = parseFloat(results[0].price);
    	var currentSales = parseFloat(results[0].product_sales);

    	if (qty > currentQty){
    		console.log(chalk.red.bold("\n\nInsufficient Quantity! Order was not placed."));
    		showData();
    	}
    	else {
    		currentQty -= qty;
    		var newSales = parseFloat(qty) * parseFloat(itemPrice);
    		currentSales += newSales;

    		connection.query("UPDATE products SET stock_quantity = ?, product_sales = ? WHERE item_id = ?", [currentQty, currentSales, id], function(err, results) {
    			if (err) throw err;
    			var cost = qty * itemPrice;
    			console.log(chalk.bold.yellow("\nThe total cost for your order was: $" + cost.toFixed(2) + "\n"));
    			whatNow();
			})
    	}

	})
}

// Function to determine if the user wishes to quit or place another order
function whatNow() {
	inquirer.prompt([
    	{
     		type: "list",
      		name: "action",
      		choices: ["Yes.", "No, please exit Bamazon Customer app."],
      		message: "Would you like to place anothere order?"
    	}
  	])
	.then(function(answer) {
		if (answer.action == "Yes."){
			showData();
		}
		else {
			console.log(chalk.bold.yellow("\nGoodbye!\n"));
			connection.end();
		}
    })
}