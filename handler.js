/* eslint-disable no-tabs */
// import express from "express";
// React apps get Transpiled
// This version of NodeJS does support import statements and there is no transpilation step

const serverlessHttp = require('serverless-http');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'Tasks',
});
// Logically separate 4 sections of code according to the method of the HTTP request received

// Export a single function, called app

const app = express();
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/tasks', (request, response) => {
  // Should make a SELECT * FROM Tasks query to the DB and return the results
  connection.query('SELECT * FROM Tasks', (err, data) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(data);
    }
  });
});

app.delete('/tasks/:id', (request, response) => {
  // Should delete the task with the specified ID from the database
  // write a querey in SQL
  // escape id provided by the user
  // send back 200 status if sucessful

  const deletedTaskId = request.params.id;
  connection.query(`DELETE FROM Tasks WHERE TaskID = ${deletedTaskId}`, (err) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      response.status(200).send(`Deleted task with ID ${deletedTaskId}!`);
    }
  });
});

/*
{
	"Task": "Clean the car",
	"DueDate": "2020-04-26",
	"Urgent": true,
}
*/

app.post('/tasks', (request, response) => {
  const data = request.body;

  const query = 'INSERT INTO Tasks (Task, Urgent, DueDate, Completed) VALUES (?, ?, ?, ?)';

  connection.query(query, [data.Task, data.Urgent, data.DueDate, false], (err, results) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      connection.query(`SELECT * FROM Tasks WHERE TaskID = ${results.insertId}`, (errs, resultss) => {
        if (err) {
          console.log('Error from MySQL', errs);
          response.status(500).send(errs);
        } else {
          response.status(201).send(resultss[0]);
        }
      });
    }
  });
});

app.put('/tasks/:id', (request, response) => {
  // write sql query to update fields provided in request where task id is equal to task provided
  // remember to escape user provided values
  // send back 200 (not updated task)

  const createdTaskId = request.params.id;

  const data = request.body;

  const query = `UPDATE Tasks SET Completed = (?) WHERE TaskID = ${createdTaskId}`;

  connection.query(query, [data.Completed], (err, results) => {
    if (err) {
      console.log('Error from MySQL', err);
      response.status(500).send(err);
    } else {
      connection.query(`UPDATE Tasks SET Completed = ${results.insertCompleted} WHERE TaskID = ${createdTaskId}`);
      response.status(201).send(`You successfully issued a put request for ID: ${createdTaskId} `);
    }
  });
});


module.exports.app = serverlessHttp(app);
