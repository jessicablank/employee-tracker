DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department(
  id INT NOT NULL,
  department_name VARCHAR(100),
  PRIMARY KEY (id)
);

CREATE TABLE employee_role(
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL(10,4),
  PRIMARY KEY (id)
);

CREATE TABLE employee_details(
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);
