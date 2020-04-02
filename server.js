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

  }
  
  
  
  module.exports = connection;