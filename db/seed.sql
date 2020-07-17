-- Starter Data on 15 July 2020 (Here if needed for back-up) --

INSERT INTO departments (departmentName) 
VALUES 
("Operations"),
("Engineering & Research"), 
("Security"), 
("Sales"), 
("Public Relations"); 


INSERT INTO roles_emp (roleTitle, roleSalary, deptID) 
VALUES 
("Associate Writer", 300.00,5),
("Engineering Manager", 600.00,2), 
("Operations Senior Manager", 1200.00,1), 
("Researcher",7000.00,2),
("Sales Manager",9000.00,4), 
("Salesperson",7000.00,4), 
("Security Manager",7000.00,3),
("Starfleet Federation",10.00,1);



INSERT INTO employee_data (firstName, lastName, roleID, deptID) 
VALUES 
("Starfleet", "Federation",1,8),
("Jake", "Sisko",1,5),
("Miles", "O'Brien",2,2), 
("Benjamin", "Sisko",3,3),
("Jadzia", "Dax",4,2),  
("Keiko", "O'Brien",4,2),
("Quark", "Shimerman",5,4),
("Garak", "Elim",5,3),
("Leeta", "Adams",6,4),
("Odo", "Auberjonois",7,3),
("Worf", "Martok",7,3);

-- Run after above --
UPDATE employee_data
SET managerID = 1
WHERE id = 4;

UPDATE employee_data
SET managerID = 4
WHERE id = 2;

UPDATE employee_data
SET managerID = 4
WHERE id = 3;

UPDATE employee_data
SET managerID = 3
WHERE id = 5;

UPDATE employee_data
SET managerID = 5
WHERE id = 6;

UPDATE employee_data
SET managerID = 4
WHERE id = 7;

UPDATE employee_data
SET managerID = 4
WHERE id = 8;

UPDATE employee_data
SET managerID = 7
WHERE id = 9;

UPDATE employee_data
SET managerID = 4
WHERE id = 10;


UPDATE employee_data
SET managerID = 4
WHERE id = 11;


