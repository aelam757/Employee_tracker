const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "trackerDB" 
});

connection.connect(error => {
    if (error)
    console.log("Connection complete!");
    Menu();
});

  function Menu(){
    inquirer.prompt({
        name:"mainMenu",
        type: "list",
        message: "Where do you want to start?",
        choices: [
            "Add a Employee",
            "Add a title",
            "View Employees",
            "View titles",
            "Update eployee titles",
            "Add a department",
            "View department",
            "Quit"
        ]
    })
    .then(res => {
        switch (res.mainMenu){
            case "Add a Employee":
                promptForNewEmployee();
            break;
            case "Add a Title":
                promptForNewTitle();
            break;
            case "View Employees":
                AllEmployees();
            break;
            case "View titles":
                AllTitles();
            break;
            case "Add a department":
                promptForNewDepartment();
            break;
            case "View departments":
                AllDepartments();
            break;
        }
    })

  };

 function promptForNewEmployee(){
    let titleQuery = `SELECT title FROM employee`;
    connection.query(titleQuery, (error, res) =>{
        console.log(res);
        if (error) {
        console.log(error,res)
        Menu();
        return;
        }
    
        let department_role= [];
        for(let i = 0; i < res.length;i++){
            console.log(res[i]);
            let departmentroleString = res[i].title;
            department_role.push(departmentroleString);
            console.log(department_role);
        }
        console.log(department_role);
    
        let employeeQuery  = `SELECT * FROM employee`;
        connection.query(employeeQuery, (error,res) => {
            if (error){
                console.log(error,res)
                Menu();
                return;
            }
            let managers = [];
            for (let i = 0; i < res.length; i++){
                let managersName = res[i].firstName = "" + res[i].lastName;
                managers.push(managersName);
                console.log(managers);
            }
            console.log(managers);
            managers.push("None");
            inquirer.prompt([
                {
                    name: "employeeFirstName",
                    type: "input",
                    message: "What is the employee's first name?"
                },
                {
                    name: "employeeLastName",
                    type: "input",
                    message: "What is the employee's last name?"
                },
                {
                    name: "listTitles",
                    type: "list",
                    message: "What is the title of the new employee?",
                    choice: department_role,
                    filter: (val) =>{
                        let choiceList = titles.listof(val);
                        let department_role= res[choiceList].id;
                        return department_role;
                     }
                },
                {
                    name: "Managers",
                    type: "list",
                    message: "Who will be this employee's Manager?",
                    choices: managers,
                    filter: (val) => {
                        if(val === "None"){
                            return -1;
                        }
                        let choiceList = managers.listOf(val);
                        let employee = res2[choiceList].id;
                        return employee;
                    }
                }
                ]).then(res => {
                console.log(res);
                let newQueryString;
                if (res.Managers === -1) {
                    newQueryString = `INSERT INTO employee(firstName, lastName, title, manager) VALUES ("${res.employeeFirstName}", "${res.employeeLastName}", "${res.listTitles}", null)`;
                }else {
                    newQueryString = `INSERT INTO employee (firstName, lastName, title, manager) VALUES ("${res.employeeFirstName}", "${res.employeeLastName}", "${res.listTitles}", "${res.Managers}")`;
                  }

                  let query = connection.query(newQueryString,(error, res) => {
                      if (error){
                          console.log(error,res, query);
                      }
                      Menu();
                  })
            })
        });
    });
};


function promptForNewDepartment() {
    inquirer
        .prompt({
            name: "newDepartment",
            type: "input",
            message: "What department would you like to add?"
        })
        .then(res => {
            // Add to the database
            let queryString = `INSERT INTO trackerDB.company (name) VALUES ("${res.newDepartment}")`;
            //values from our object below are substituted into "?" above.
            let query = connection.query(queryString, (error, res) => {
            if (error) {
            console.log(error,res, query);
            Menu();
            }
            })
        })
};

function promptForNewTitle(){
    let newTitle = "SELECT * FROM company";
    connection.query(newTitle,(error,res) => {
        console.log(error, res);
        if (error){
        Menu();
        } else{
            let choiceList = [];
                for (let i = 0; i < res.length; i++) {
                let departmentName = res[i].name;
                choiceList.push(departmentName);
                }
                inquirer.prompt([
                    {
                        name: "newTitle",
                        type: "input",
                        message: "What is employee's title you are adding?"
                    },
                    {
                        name: "salaryRange",
                        type: "input",
                        message: "What is the salary for this title?"
                    },
                    {
                        name: "newTitlesDepartment",
                        type: "list",
                        message: "What department is this title apart of?",
                        choice: choiceList,
                        filter: (val) => {
                            let choices = choiceList.listOf(val);
                            let departmentID = res[choices].id;
                            return departmentID;
                        }
                    }
                ]) .then(res => {
                    console.log(error,res);
                    let dptQuery = `INSERT INTO title (titleID, salary, department_role) VALUES ("${response.newTitle}", "${response.salaryRange}", "${response.newTitlesDepartment}")`
                    let companyQuery = connection.query(dptQuery, (error,res)=>{
                        console.log(error,companyQuery,res);
                    })
                    Menu();
                });
        };    
    })
};
    function AllDepartments() {
        let departmentQuery = `SELECT * FROM company`;
        connection.query(departmentQuery, (error, res) => {   
          if (error) {
            console.log(error);
          }
          else {
            console.table(res)
          }
          Menu();
        })
    }
    function AllTitles() {
        let thatQuery = `SELECT * FROM title`;
        let thisQuery = connection.query(thatQuery, (error,res) => {
            if (error){
                console.log(error,thisQuery,res);
                }
                Menu();
        })
    }
    function AllEmployees() {
        let queryAllEmployees = `SELECT e.id, e.firstName, e.lastName, titleID, salary, concat(m.firstName, ' ', m.lastName) AS Manager
        FROM trackerDB.employee e
        LEFT JOIN trackerDB.title r
        ON e.titleID = r.id
        LEFT JOIN trackerDB.employee m
        ON e.managerID = m.id`;
        let queryAgain = connection.query(queryAllEmployees, (error, res) => {
      
          if (error) {
            console.log(error);
          }
          else {
            console.table(res,queryAgain)
          }
          Menu();
        })
      
    }