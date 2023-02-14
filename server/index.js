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

app.get('/api/userList/:day', (req, res, next) => {
  // const userId = Number(req.params.userId);
  // if (!Number.isInteger(userId) || userId < 1) {
  //   throw new ClientError(400, 'userId must be a positive integer');
  // }
  // console.log(req.headers);
  const { day } = req.params;
  const sql = `
  select "exerciseId",
  "name",
  "details"
  from "userExerciseList"
  where "date" = $1
  `;
  const params = [Number(day)];

  // console.log(params);
  db.query(sql, params)
    .then(result => {
      // console.log(result);
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
      res.status(201).json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.put('/api/userList', (req, res, next) => {
  const { name, details, targetId } = req.body;
  if (!targetId) {
    throw new ClientError(400, 'exerciseId missing');
  }
  const sql = `
    update "userExerciseList"
    set "name" = $1,
        "details" = $2
    where "exerciseId" = $3
    returning *
  `;
  const params = [name, details, targetId];
  db.query(sql, params)
    .then(result => {
      const resultArr = result.rows[0];
      if (!resultArr) {
        throw new ClientError(404, 'Cannot find requested exercise');
      } else {
        res.status(200).json(resultArr);
      }
    })
    .catch(err => next(err));
});

app.put('/api/caloriesData', (req, res, next) => {
  const { userData, userId } = req.body;
  if (!userData) {
    throw new ClientError(400, 'calories not found');
  }
  const sql = `
    update "calories"
    set "calorieRec" = $1
    where "userId" = $2
    returning *
  `;
  const params = [userData, userId];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
    .catch(err => next(err));
});

app.post('/api/caloriesData', (req, res, next) => {
  const { userData, userId } = req.body;
  if (!userData) {
    throw new ClientError(400, 'calories not found');
  }
  const sql = `
    insert into "calories" ("calorieRec", "userId")
    values($1, $2)
    returning *
  `;
  const params = [userData, userId];
  db.query(sql, params)
    .then(result => res.status(200).json(result.rows[0]))
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
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

// app.use(authorizationMiddleware);

// app.post('/api/flashcards', (req, res, next) => {
//   const { userId } = req.user;
//   const { question, answer } = req.body;
//   if (!question || !answer) {
//     throw new ClientError(400, 'question and answer are required fields');
//   }
//   const sql = `
//     insert into "flashcards" ("userId", "question", "answer")
//     values ($1, $2, $3)
//     returning *
//   `;
//   const params = [userId, question, answer];
//   db.query(sql, params)
//     .then(result => {
//       const [flashcard] = result.rows;
//       res.status(201).json(flashcard);
//     })
//     .catch(err => next(err));
// });

// app.get('/api/flashcards', (req, res, next) => {
//   const { userId } = req.user;
//   const sql = `
//     select *
//       from "flashcards"
//      where "userId" = $1
//   `;
//   const params = [userId];
//   db.query(sql, params)
//     .then(result => {
//       res.json(result.rows);
//     })
//     .catch(err => next(err));
// });
