const { database } = require('../database');

// const { promisify } = require('util');

// const dbQuery = promisify(database.query);

exports.getUsers = (req, res, next) => {
  try {
    const query = 'SELECT * FROM users';

    database.query(query, (err, results) => {
      console.log('trying to query');
      if (err) {
        console.log('Error', err);
        throw err;
      }

      res.status(200).json({
        status: 'success',
        results: results
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'there was an error in the server',
      results: err
    });
  }
};

exports.getUser = (req, res, next) => {
  const query = `SELECT * FROM users WHERE email = "${req.body.email}"`;
  database.query(query, (err, results) => {
    if (err) {
      console.log('Error', err);
      throw err;
    }
    res.status(200).json({
      status: 'success',
      results: results
    });
  });
};

exports.addUser = async (req, res, next) => {
  try {
    const createQuery = `INSERT users(first_name, last_name, email, password, location, dept, is_admin) VALUES ('${req.body.first_name}', '${req.body.last_name}', '${req.body.email}', '${req.body.password}', '${req.body.location}', '${req.body.dept}', ${req.body.is_admin})`;

    database.query(createQuery, (err, results) => {
      if (err) {
        console.log('Error', err);
        throw err;
      }
      res.status(200).json({
        status: 'success',
        results: 'finished '
      });
    });
  } catch (err) {
    res.status(500).json({
      status: 'there was an error in the server',
      results: err
    });
  }
};

exports.deleteUser = (req, res, next) => {
  const query = `DELETE FROM users WHERE id = "${req.body.id}"`;
  database.query(query, (err, results) => {
    if (err) {
      console.log('Error', err);
      throw err;
    }

    res.status(200).json({
      status: 'success',
      results: 'user Deleted'
    });
  });
};
