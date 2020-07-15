DROP DATABASE IF EXISTS employee_DB;
CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE departments(
  dept_id INT NOT NULL,
  department_name VARCHAR(100),
  PRIMARY KEY (dept_id)
);

CREATE TABLE roles_emp(
  role_id INT NOT NULL,
  role_title VARCHAR(30),
  role_salary DECIMAL(10,4),
  PRIMARY KEY (role_id)
);

CREATE TABLE employee_data(
  emp_id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  PRIMARY KEY (emp_id)
);
