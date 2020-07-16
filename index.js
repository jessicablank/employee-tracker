// import dependencies (mysql, inquirer, console.table)
const mysql = require("mysql");
const inquirer = require("inquirer");
//const cTable = require("console.table");

// create a mysql connection
const connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "bones",
    database: "employee_DB",
});

connection.connect((err) => {
    if (err) {
        console.log("Unable to connect to data source. Good bye.");
    } else {
        console.log("Connected")
        mainMenu();
    }
});

function mainMenu() {
    const VIEW_EMPLOYEES = "View all employees";

    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                VIEW_EMPLOYEES,
                "EXIT",
            ],
        }).then((answer) => {
            if (answer.action === VIEW_EMPLOYEES) {
                return viewEmployees();
            }
            connection.end();
        }).catch((error) => {
            console.log(error);
            connection.end();
        });
}



function viewEmployees() {
    // query db for employees joined with roles
    const sqlString = `
    SELECT CONCAT(employee_data.firstName, " ", employee_data.lastName) 
AS Name, roles_emp.roleTitle as Role, roles_emp.roleSalary as Salary
FROM employee_data INNER JOIN roles_emp ON employee_data.roleID = roles_emp.id;
      `;
    connection.query(sqlString, (error, results) => {
        // display the results a formatted table
        if (error) {
            throw error;
        }
        console.table(results);
        // go back to the menu
        mainMenu();
    });
}