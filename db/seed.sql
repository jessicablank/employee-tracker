-- Starter Data on 15 July 2020 --

INSERT INTO departments (departmentName) 
VALUES 
("Operations"),
("Engineering & Research"), 
("Security"), 
("Sales"), 
("Public Relations"); 


INSERT INTO roles_emp (roleTitle, roleSalary, deptID) 
VALUES 
("Associate Writer", 30000,5),
("Engineering Manager", 60000,2), 
("Operations Senior Manager", 120000,1), 
("Researcher",700000,2),
("Sales Manager",900000,4), 
("Salesperson",700000,4), 
("Security Manager",700000,3);



INSERT INTO employee_data (firstName, lastName, roleID, deptID) 
VALUES 
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

UPDATE employee_data
SET managerID = 13
WHERE id = 11;




