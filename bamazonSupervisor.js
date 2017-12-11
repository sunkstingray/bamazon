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

function startMenu() {

    console.log(chalk.bold.inverse("\n\n Bamazon Supervisor \n"));

    inquirer.prompt([
        {
            type: "list",
            name: "menuChoice",
            choices: ["View Product Sales by Department", "Create New Department", "Quit Bamazon Supervisor"],
            message: "Please choose an option:"
        }
      ])
      .then(function(answer) {
            switch(answer.menuChoice) {
                case "View Product Sales by Department":
                    viewSales();
                break;
                case "Create New Department":
                    createDepartment();
                    break;
                case "Quit Bamazon Supervisor":
                    connection.end();
                    console.log(chalk.bold.yellow("\nGoodbye!\n"));
                    break;
            }
        })
}


// Function to display sales by department
function viewSales() {
	connection.query("SELECT d.department_id, d.department_name, d.over_head_costs, p.department_name, sum(p.product_sales) as product_sales, sum(p.product_sales) - over_head_costs as total_profit FROM products p RIGHT JOIN departments d ON p.department_name = d.department_name GROUP BY d.department_name", function(err, results) {
            if (err) throw err;

            console.log(chalk.bold.yellow("\nNow viewing product sales by department...\n"));
            console.log(columnify(results, {minWidth: 20}));
            
            startMenu();
    })
}

// Function to add a new department
function createDepartment() {
	    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "New department name:"
        },
        {
            type: "input",
            name: "overhead",
            message: "What is the department overhead:"
        },
    ])
    .then(function(answer) {

        connection.query("INSERT INTO departments (department_name, over_head_costs) VALUES (?, ?)", [answer.department, answer.overhead], function(err, results) {
            if (err) throw err;
        
            console.log(chalk.bold.yellow("\nThe department " + answer.department + " has been added to the department list."));
        
            startMenu();
       
        })

    })
}

// // GROUP BY department_name