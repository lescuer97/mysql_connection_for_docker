const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const {
  getUsers,
  getUser,
  deleteUser,
  addUser
} = require('./controller/userController');
const app = express();

app.use(morgan('dev'));
app.use(express.json());

const port = 4000;

// gets every user
app.get('/users', getUsers);

// get single user
app.get('/user', getUser);

// get single user
app.post('/createUser', addUser);

// deletes single user via its id
app.delete('/user', deleteUser);

app.use('*', (req, res) => {
  res.status(200).json({
    Response: "this route doesn't really do anything"
  });
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
