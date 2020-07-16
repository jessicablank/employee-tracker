-- Departments as of 15 July 2020 --
INSERT INTO departments (departmentName) 
VALUES 
("Operations"),
("Engineering & Research"), 
("Security"), 
("Sales"), 
("Public Relations"); 

-- deptID Reference --
-- Operations: 1
-- Engineers & Research: 2
-- Security: 3
-- Sales: 4
-- Public Relations: 5

INSERT INTO roles_emp (roleTitle, roleSalary, deptID) 
VALUES 
("Associate Writer", 30000,5),
("Engineer Manager", 60000,2), 
("Operations Senior Manager", 120000,1), 
("Researcher",700000,2),
("Sales Manager",900000,4), 
("Salesperson",700000,4), 
("Security Manager",700000,3);

-- roleID Reference --
-- Associate Writer: 1
-- Engineering Manager: 2
-- Operations Senior Manager: 3
-- Researcher: 4
-- Sales Manager: 5
-- Salesperson: 6
-- Security Manager: 7

INSERT INTO employee_data (firstName, lastName, roleID, deptID) 
VALUES 
("Jake", "Sisko",1,5),
("Miles", "O'Brien",2,2), 
("Benjamin", "Sisko",3,1),
("Jadzia", "Dax",4,2),  
("Keiko", "O'Brien",4,2),
("Quark", "Shimerman",5,4),
("Garak", "Elim",5,3),
("Leeta", "Adams",6,4),
("Odo", "Auberjonois",7,3),
("Worf", "Martok",7,3);






