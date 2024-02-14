INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');


INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 100000, 1),
('Salesperson', 80000, 1),
('Lead Engineer', 150000, 2),
('Software Engineer', 120000, 2),
('Account Manager', 160000, 3),
('Accountant', 125000, 3),
('Legal Team Lead', 250000, 4),
('Lawyer', 190000, 4);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('John', 'Doe', 1, NULL),
('Mike', 'Chan', 2, 1),
('Ashey', 'Rodriguez', 3, NULL),
('Kevin', 'Tupik', 4, 3),
('Kunal', 'Singh', 5, NULL),
('Malia', 'Brown', 6, 5),
('Sarah', 'Lourd', 7, NULL),
('Tom', 'Allen', 8, 7);


INSERT INTO employee_full (first_name, last_name, title, department_name, salary, manager)
VALUES
('John', 'Doe', 'Sales Lead', 'Sales', 100000, NULL),
('Mike', 'Chan', 'Salesperson', 'Sales', 80000, 'John Doe'),
('Ashey', 'Rodriguez', 'Lead Engineer', 'Engineering', 150000, NULL),
('Kevin', 'Tupik', 'Software Engineer', 'Engineering', 120000, 'Ashley Rodriguez'),
('Kunal', 'Singh', 'Account Manager', 'Finance', 160000, NULL),
('Malia', 'Brown', 'Accountant', 'Finance', 125000, 'Kunal Singh'),
('Sarah', 'Lourd', 'Legal Team Lead', 'Legal', 250000, NULL),
('Tom', 'Allen', 'Lawyer', 'Legal', 190000, 'Sarah Lourd');

-- SELECT * FROM department;
-- SELECT * FROM role;
-- SELECT * FROM employee;
-- SELECT * FROM employee_full;
