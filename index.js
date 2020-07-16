// import dependencies (mysql, inquirer, console.table)
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

// create a mysql connection
const connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "bones",
    database: "employee_db",
  });

  connection.connect((err) => {
    if (err) {
      console.log("Unable to connect to data source. Good bye.");
    } else {
      mainMenu();
    }
  });