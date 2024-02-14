const inquirer = require('inquirer');
const mysql = require('mysql2');
// const cTable = require('console.table')

require('dotenv').config();


const connection = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    promptUser();
});



function promptUser() {
    inquirer.prompt({

        type: 'list',
        name: 'choices',
        message: 'What would you like to do?',
        choices: [
            'View all Employees',
            'Add Employees',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'View All Departments',
            'Add Department'
        ]
    })

        .then((answers) => {
            const { choices } = answers;

            if (choices === "View all Employees") {
                showEmployees();
            }

            if (choices === "Add Employees") {
                addEmployees();
            }

            if (choices === "Update Employee Role") {
                updateEmployee();
            }

            if (choices === "View All Roles") {
                showRoles();
            }

            if (choices === "Add Role") {
                addRole();
            }

            if (choices === "View All Departments") {
                showDepartments();
            }

            if (choices === "Add Department") {
                addDepartments();
            }

            if (choices === "No Action") {
                connection.end()
            };
        });
};

function showEmployees() {
    let query = 'SELECT * FROM employee_full';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function addEmployees() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the employees first name?',
            name: 'employeeFirstName'
        },

        {
            type: 'input',
            message: 'What is the employees last name?',
            name: 'employeeLastName'
        },

        {
            type: 'list',
            message: 'What is the employees role?',
            name: 'roleID',
            choices: [
                'Accountant',
                'Legal Team Lead',
                'Lawyer',
                'Customer Service',
                'Sales Lead',
                'Salesperson',
                'Lead Engineer'
            ]
        },

        {
            type: 'list',
            message: 'Choose role department',
            name: 'department',
            choices: [
                'Sales',
                'Engineering',
                'Finance',
                'Legal'
            ]
        },

        {
            type: 'input',
            message: 'What is the employees salary?',
            name: 'salary'
        },

        {
            type: 'list',
            message: 'Who is the employees manager?',
            name: 'managerID',
            choices: [
                'None',
                'John Doe',
                'Mike Chan',
                'Ashley Rodriguez',
                'Kevin Tupik',
                'Kunal Singh',
                'Malia Brown'
            ]
        }
    ])
        .then(function (answer) {
            connection.query('INSERT INTO employee_full (first_name, last_name, title, department_name, salary, manager) VALUES (?, ?, ?, ?, ?, ?)', [answer.employeeFirstName, answer.employeeLastName, answer.roleID, answer.department, answer.salary, answer.managerID],
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    console.log(`New employee added to database`)
                    promptUser()
                });
        });
}

updateEmployee = () => {
    const employeeSql = `SELECT * FROM employee`;

    connection.query(employeeSql, (err, data) => {
        if (err) throw err;

        const employees = data.map(({ id, first_name, last_name }) => ({ name: first_name + " " + last_name, value: id }));

        inquirer.prompt([
            {
                type: 'list',
                message: 'Which employee would you like to update?',
                name: 'name',
                choices: employees
            }
        ])
            .then(empChoice => {
                const employee = empChoice.name;
                const params = [];
                params.push(employee);

                const roleSql = `SELECT * FROM role`;

                connection.query(roleSql, (err, data) => {
                    if (err) throw err;

                    const roles = data.map(({ id, title }) => ({ name: title, value: id }));

                    inquirer.prompt([
                        {
                            type: 'list',
                            message: 'What is the employees new role?',
                            name: 'role',
                            choices: roles
                        }
                    ])
                        .then(roleCoice => {
                            const role = roleCoice.role;
                            params.push(role);

                            let employee = params[0]
                            params[0] = role
                            params[1] = employee

                            const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
                            connection.query(sql, params, (err, results) => {
                                if (err) throw err;
                                console.log('Employee has been updated');
                                promptUser();
                            });
                        });
                });
            });
    });
};

function showRoles() {
    let query = 'SELECT * FROM role';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the role?',
            name: 'roleName'
        },

        {
            type: 'input',
            message: 'What is the salary of the role?',
            name: 'roleSalary'
        },

        {
            type: 'list',
            message: 'What department id belongs to this role?',
            name: 'roleDepartment',
            choices: [
                '1',
                '2',
                '3',
                '4'
            ]
        }
    ])
        .then(function (answer) {
            connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answer.roleName, answer.roleSalary, answer.roleDepartment],
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    console.log(`New role added to database`)
                    promptUser()
                });
        });
}

function showDepartments() {
    let query = 'SELECT * FROM department';
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        promptUser();
    });
}

function addDepartments() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'What is the name of the department?',
            name: 'departmentName'
        }
    ])
        .then(function (answer) {
            connection.query('INSERT INTO department (name) VALUES (?)', [answer.departmentName],
                function (err, res) {
                    if (err) throw err;
                    console.table(res)
                    console.log(`New department added to database`)
                    promptUser()
                });
        });
}