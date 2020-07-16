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
    const VIEW_DEPARTMENTS = "View departments";

    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                VIEW_EMPLOYEES,
                VIEW_DEPARTMENTS,
                "EXIT",
            ],
        }).then((answer) => {
            if (answer.action === VIEW_EMPLOYEES) {
                return viewEmployees();
            }
            if (answer.action === VIEW_DEPARTMENTS) {
                return viewDepartments();
            }
            connection.end();
        }).catch((error) => {
            console.log(error);
            connection.end();
        });
}



function viewEmployees() {
    // query db for employees joined with roles and department
    const sqlString = `
    SELECT CONCAT(employee_data.firstName, " ", employee_data.lastName) AS Name, 
    roles_emp.roleTitle as Role, roles_emp.roleSalary as Salary, 
    departments.departmentName as Department
    
    FROM employee_data 
    INNER JOIN roles_emp ON employee_data.roleID = roles_emp.id
    INNER JOIN departments ON employee_data.deptID = departments.id;
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

function viewDepartments() {
    //get all the employees
    const departSql = `
    SELECT departmentname FROM departments;
      `;
    connection.query(departSql, (error, results) => {
        // display the results a formatted table
        if (error) {
            throw error;
        }
        console.table(results);
        // go back to the menu
        mainMenu();
    });
}