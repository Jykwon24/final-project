require('dotenv/config');
const path = require('path');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const ClientError = require('./client-error');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const app = express();
const publicPath = path.join(__dirname, 'public');

if (process.env.NODE_ENV === 'development') {
  app.use(require('./dev-middleware')(publicPath));
} else {
  app.use(express.static(publicPath));
}

app.use(express.json());

app.get('/api/defaultList', (req, res, next) => {
  const sql = `
    select "bodyPart",
           "name",
           "details"
    from "defaultExercises"
    `;
  db.query(sql)
    .then(result => res.status(200).json(result.rows))
    .catch(err => next(err));
});

app.post('/api/auth/sign-up', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(400, 'username and password are required fields');
  }
  argon2
    .hash(password)
    .then(hashedPassword => {
      const sql = `
      insert into "users" ("username", "hashedPassword")
      values ($1, $2)
      returning "userId", "username", "createdAt"
      `;
      const params = [username, hashedPassword];
      return db.query(sql, params);
    })
    .then(result => {
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch(err => next(err));
});

app.post('/api/auth/sign-in', (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ClientError(401, 'invalid login');
  }
  const sql = `
    select "userId",
           "hashedPassword"
      from "users"
     where "username" = $1
  `;
  const params = [username];
  db.query(sql, params)
    .then(result => {
      const [user] = result.rows;
      if (!user) {
        throw new ClientError(401, 'invalid login');
      }
      const { userId, hashedPassword } = user;
      return argon2
        .verify(hashedPassword, password)
        .then(isMatching => {
          if (!isMatching) {
            throw new ClientError(401, 'invalid login');
          }
          const payload = { userId, username };
          const token = jwt.sign(payload, process.env.TOKEN_SECRET);
          res.json({ token, user: payload });
        });
    })
    .catch(err => next(err));
});

app.get('/api/userList', (req, res, next) => {
  // const userId = Number(req.params.userId);
  // if (!Number.isInteger(userId) || userId < 1) {
  //   throw new ClientError(400, 'userId must be a positive integer');
  // }
  const sql = `
     select "exerciseId",
            "date",
            "name",
            "details"
      from "userExerciseList"
  `;
  db.query(sql)
    .then(result => {
      res.status(200).json(result.rows);
    })
    .catch(err => next(err));
});

// app.get('/api/userList/:date', (req, res, next) => {
//   const day = Number(req.params.date);
//   if (!Number.isInteger(day) || day < 1) {
//     throw new ClientError(400, 'userId must be a positive integer');
//   }
//   const sql = `
//      select "date",
//             "name",
//             "details"
//       from "userExerciseList"
//   `;
//   db.query(sql)
//     .then(result => {
//       res.status(200).json(result.rows);
//     })
//     .catch(err => next(err));
// });

app.post('/api/userList', (req, res, next) => {
  const { userId, selectedDay, name, details } = req.body;
  if (!selectedDay || !name || !details) {
    throw new ClientError(401, 'required fields missing');
  }
  const sql = `
    insert into "userExerciseList" ("userId", "date", "name", "details")
    values($1, $2, $3, $4)
    returning "userId", "exerciseId", "date", "name", "details"
           `;
  const params = [userId, selectedDay, name, details];
  db.query(sql, params)
    .then(result => {
      res.status(201).json(result.rows);
    })
    .catch(err => next(err));
});

app.delete('/api/userList', (req, res, next) => {
  const { exerciseId } = req.body;
  if (!exerciseId) {
    throw new ClientError(400, 'exerciseId missing');
  }
  const sql = `
    delete from "userExerciseList"
    where "exerciseId" = $1
    returning *
  `;
  const params = [exerciseId];
  db.query(sql, params)
    .then(result => {
      const exerciseArray = result.rows[0];
      if (!exerciseArray) {
        res.status(404).json({
          error: 'Cannot find the exercise'
        });
      } else {
        res.status(204);
      }
    })
    .catch(err => {
      console.error(err);
    });
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
