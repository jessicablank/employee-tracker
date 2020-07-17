DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments(
  id INT AUTO_INCREMENT NOT NULL,
  departmentName VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles_emp(
  id INT AUTO_INCREMENT NOT NULL,
  roleTitle VARCHAR(30) NOT NULL,
  roleSalary DECIMAL(10,2),
  deptID INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (deptID) REFERENCES departments(id)
);

CREATE TABLE employee_data(
  id INT AUTO_INCREMENT NOT NULL,
  firstName VARCHAR(30),
  lastName VARCHAR(30),
  roleID INT NOT NULL,
  deptID INT NOT NULL,
  managerID INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (roleID) REFERENCES roles_emp(id),
  FOREIGN KEY (deptID) REFERENCES departments(id),
  FOREIGN KEY (managerID) REFERENCES employee_data(id)
);

