const inquirer = require("inquirer");
const mysql = require("mysql");

const connection = mysql.createConnection({
    port: 3306,
    host: "localhost",
    user: "root",
    password: "root",
    database: "trackerDB." 
});

connection.connect(error => {
    if (error) throw error;
    console.log("Connection complete!");
    Menu();
  });

  function Menu(){
    inquirer.prompt({
        name:"Main Menu",
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
        switch (res["Main Menu"]){
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

  }

  promptForNewEmployee() {

          let titleQuery = `SELECT * FROM trackerDB.employee.title`;
          connection.query(titleQuery, (error,res)=>{
              if (error) {
                console.log(error,res)
                promptMenu();
                return;
              }
          })
          let title = [];
          for(let i = 0; i <res.length;i++){
              let titleString = res[i].title;
              title.push(titleString);
          }

        let employeeQuery  = `SELECT * FROM trackerDB.employee`;
          connection.query(employeeQuery, (error,res) => {
              if (error){
                console.log(error,res)
                promptMenu();
                return;
            }

            let managers = [];

            for (let i = 0; i < res2.length; i++){
                let managersName = res2[i].firstName = "" + res2[i].lastName;
                manager.push(managersName);
            }
            manager.push("None");

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
                    choice: titles,
                    filter: (val) =>{
                        let choiceList = titles.listof(val);
                        let title = res[choiceList].id;
                        return title;
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
                    newQueryString = `INSERT INTO trackerDB.employee(firstName, lastName, title, manager) VALUES ("${res.employeeFirstName}", "${res.employeeLastName}", "${res.listTitles}", null)`;
                }else {
                    newQueryString = `INSERT INTO employeeDB.employee (firstName, lastName, title, manager) VALUES ("${res.employeeFirstName}", "${res.employeeLastName}", "${res.listTitles}", "${res.Managers}")`;
                  }

                  let thisQuery = connection.thisQuery(newQueryString,(error, res) => {
                      if (error){
                          console.log(error,res);
                      }

                      promptMenu();
                  })
            })


        }
    )};

    function AllDepartments() {
        let departmentQuery = `SELECT * FROM trackerDB.company.department`;
        let query = connection.query(departmentQuery, (err, res) => {
      
          if (err) {
            console.log(err);
          }
          else {
            console.table(res)
          }
          promptMainMenu();
        });
      
      }
  
  module.exports = connection;