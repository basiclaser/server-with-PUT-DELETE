# setup

- add your elephantSQL database details to the config object on line 7.
- `npm install`
- `npm run dev`
- create a table called tasks on elephantSQL (use the commented-out code on line 15)

use POSTMAN to send GET,POST,PUT,DELETE requests eg.

- GET localhost:4000/api/tasks
- POST localhost:4000/api/tasks {"title": "wash the car",
  "body": "the car is dirty",
  "img": "imgofadirtycar.jpg"}
- GET localhost:4000/api/tasks/2
- PUT localhost:4000/api/tasks/2 {"title": "wash the car",
  "body": "somebody stole the car!",
  "img": "imgofamissing.jpg"}
- DELETE localhost:4000/api/tasks/3
