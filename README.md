Todo Application - Backend
This is the back end API of my Todo Application, built throughout the Tech Returners Your Journey Into Tech course. It is consumed by a front end React application, available on https://github.com/Fatima-DR/ToDo-List-Frontend-with-react 
It connects to an RDS Database.

The hosted version of the application is available here: https://fatima-dr.github.io/ToDo-List-Frontend-with-react/

Technology Used
This project uses the following technology:

Serverless Framework
JavaScript (ES2015+)
Express
SQL
Mysql library
AWS Lambda and API Gateway
AWS RDS
ESLint
Endpoints
The API exposes the following endpoints:

GET /tasks
https://rgdvcax7lf.execute-api.eu-west-1.amazonaws.com/dev/tasks

Responds with JSON containing all tasks in the Database.

POST /tasks
https://rgdvcax7lf.execute-api.eu-west-1.amazonaws.com/dev/tasks

Will create a new task when sent a JSON payload in the format:

{
  "text": "walk dog",
  "completed": false,
  "date": "2020-05-25"
}
DELETE /tasks/:taskId
https://rgdvcax7lf.execute-api.eu-west-1.amazonaws.com/dev/tasks/${id}

Deletes the task of the given ID.

PUT /tasks/:taskId
https://rgdvcax7lf.execute-api.eu-west-1.amazonaws.com/dev/tasks/${id}

Will update a task when sent a JSON payload in the format:

{
  "text": "walk dog",
  "completed": true,
  "date": "2020-05-25"
}