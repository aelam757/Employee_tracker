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
                viewAllEmployees();
            break;
            case "View titles":
                viewAllTitles();
            break;
            case "Add a department":
                promptForNewDepartment();
            break;
            case "View departments":
                viewAllDepartments();
            break;
        }
    })

  }

  promptForNewEmployee(){
      inquirer
      .prompt({
          name: "newEmployee",
          type: "input",
          message: "What is your name?"
      }).then(res => {
          let queryString = `INSERT INTO trackerDB.employee()`
      })
  }
  
  module.exports = connection;