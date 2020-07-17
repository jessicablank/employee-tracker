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
    const VIEW_DEPARTMENTS = "View all departments";
    const VIEW_ROLES = "View all roles";
    const ADD_EMPLOYEE = "Add a new employee";
    const ADD_DEPARTMENT = "Add a new department";
    const ADD_ROLE = "Add a new role";
    const UPDATE_EMP_ROLE = "Update an employee's role";
    

    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                VIEW_EMPLOYEES,
                VIEW_DEPARTMENTS,
                VIEW_ROLES,
                ADD_EMPLOYEE,
                ADD_DEPARTMENT,
                ADD_ROLE,
                UPDATE_EMP_ROLE,
                "EXIT",
            ],
        }).then((answer) => {
            if (answer.action === VIEW_EMPLOYEES) {
                return viewEmployees();
            }
            if (answer.action === VIEW_DEPARTMENTS) {
                return viewDepartments();
            }
            if (answer.action === VIEW_ROLES) {
                return viewRoles();
            }
            if (answer.action === ADD_EMPLOYEE) {
                return addEmployee();
            }
            if (answer.action === ADD_DEPARTMENT) {
                return addDepartment();
            }
            if (answer.action === ADD_ROLE) {
                return addRole();
            }
            if (answer.action === UPDATE_EMP_ROLE) {
                return updateEmpRole();
            }
            connection.end();
        })
        .catch((error) => {
            console.log(error);
            connection.end();
        });
}

function viewEmployees() {
    // query db for employees joined with roles and department
    const sqlString = `
    SELECT CONCAT(e.firstName, " ", e.lastName) AS Name, roles_emp.roleTitle as Role, roles_emp.roleSalary as Salary, departments.departmentName as Department, CONCAT(m.firstName, " ", m.lastName) AS Manager
    FROM employee_data e 
    INNER JOIN roles_emp ON e.roleID = roles_emp.id 
    INNER JOIN departments ON e.deptID = departments.id 
    INNER JOIN employee_data m ON e.managerID = m.id;
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
    
    const departSql = `
    SELECT departmentName AS Departments FROM departments;
      `;
    connection.query(departSql, (error, results) => {
        
        if (error) {
            throw error;
        }
        console.table(results);
        // go back to the menu
        mainMenu();
    });
}

function viewRoles() {
    const roleSql = `
    SELECT roleTitle FROM roles_emp;
      `;
    connection.query(roleSql, (error, results) => {
        
        if (error) {
            throw error;
        }
        console.table(results);
        // go back to the menu
        mainMenu();
    });
}
function addEmployee() {
    //create a new id from department table & role table due to FK
    connection.query("SELECT * FROM departments", (err, deptRes) => {
        if (err) {
            throw err;
        }
        const deptNames = deptRes.map((row) => row.departmentName);

        connection.query("SELECT * FROM roles_emp", (err, rolesRes) => {
            if (err) {
                throw err;
            }
            const roleNames = rolesRes.map((row) => row.roleTitle);

            connection.query('SELECT * FROM employee_data', (err, empRes) => {
                if (err) {
                    throw err;
                }
                const empNames = empRes.map((row) => row.lastName);

                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Enter new employee first name:",
                            name: "firstName",
                        },
                        {
                            type: "input",
                            message: "Enter the new employee last name:",
                            name: "lastName",
                        },
                        {
                            type: "list",
                            message: "Select department for this new employee:",
                            name: "department",
                            choices: deptNames,
                        },
                        {
                            type: "list",
                            message: "Select role for this new employee:",
                            name: "role",
                            choices: roleNames,
                        },
                        {
                            type: "list",
                            message: "Select a manager for this new employee:",
                            name: "manager",
                            choices: empNames,
                        }
                    ]).then((answers) => {
                        const chosenDept = deptRes.find((row) => row.departmentName === answers.department);
                        const chosenRole = rolesRes.find((row) => row.roleTitle === answers.role);
                        const chosenBoss = empRes.find((row) => row.lastName === answers.manager);

                        const empQuery = "INSERT INTO employee_data SET ? ";
                        connection.query(empQuery,
                            {
                                firstName: answers.firstName,
                                lastName: answers.lastName,
                                roleID: chosenRole.id,
                                deptID: chosenDept.id,
                                managerID: chosenBoss.id,
                            },
                            (error, results) => {

                                if (error) {
                                    throw error;
                                }
                                console.log(answers.firstName + " " + answers.lastName + " added!");
                                // go back to the menu
                                mainMenu();
                            });
                    });
            });
        });
    });
}
function addDepartment() {
    //prompt user for input
    inquirer
        .prompt([
            {
                type: "input",
                message: "Enter new department name",
                name: "departmentName",
            }]).then((answers) => {
                const deptSQL = "INSERT INTO departments(departmentName) VALUES (?) ";
                connection.query(deptSQL, answers.departmentName, (error, results) => {

                    if (error) {
                        throw error;
                    }
                    console.log(answers.departmentName + " department added!");
                    // go back to the menu
                    mainMenu();
                });
            });
}

function addRole() {
    //create a new id from department table due to FK
    connection.query("SELECT * FROM departments", (err, res) => {
        if (err) {
            throw err;
        }
        const deptNames = res.map((row) => row.departmentName);
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Enter new role name:",
                    name: "roleTitle",
                },
                {
                    type: "input",
                    message: "Enter the new role's salary (numbers only):",
                    name: "salary",
                },
                {
                    type: "list",
                    message: "Select department for this new role:",
                    name: "department",
                    choices: deptNames,
                }
            ]).then((answers) => {
                const chosenDept = res.find((row) => row.departmentName === answers.department);

                const roleQuery = "INSERT INTO roles_emp SET ? ";
                connection.query(roleQuery,
                    {
                        roleTitle: answers.roleTitle,
                        roleSalary: answers.salary,
                        deptID: chosenDept.id
                    },
                    (error, results) => {

                        if (error) {
                            throw error;
                        }
                        console.log(answers.roleTitle + " role added!");
                        // go back to the menu
                        mainMenu();
                    });
            });
    });

}

function updateEmpRole() {
    connection.query("SELECT * FROM roles_emp", (err, rolesRes) => {
        if (err) {
            throw err;
        }
        const roleNames = rolesRes.map((row) => row.roleTitle);

        connection.query('SELECT CONCAT(firstName, " ", lastName) AS Name FROM employee_data', (err, empRes) => {
            if (err) {
                throw err;
            }
            const empNames = empRes.map((row) => row.Name);

            inquirer.prompt([
                {
                    type: "list",
                    message: "Select employee for role change:",
                    name: "employee",
                    choices: empNames,
                },
                {
                    type: "list",
                    message: "Select updated role:",
                    name: "role",
                    choices: roleNames,
                },
            ]).then((answers) => {
                const updatedRole = rolesRes.find((row) => row.roleTitle === answers.role);
                const updatedEmployee = empRes.find((row) => row.Name === answers.employee);

                let query = "UPDATE employee_data SET ? WHERE ?";
                connection.query(query,
                    [
                        {
                            roleID: updatedRole.id,
                        },
                        {
                            id: updatedEmployee.id
                        }
                    ],
                    function (error) {
                        if (error) throw error;

                        console.log(" role changed!");
                        mainMenu();

                    });
            });
        });
    });
}
