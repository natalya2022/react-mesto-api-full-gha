const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookies = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
// const rateLimit = require('express-rate-limit');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

console.log(process.env.IS_SERVER);

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();
// app.use(cors({ origin: true, credentials: true }));
// app.use(cors({ origin: 'https://places.nomoreparties.co', credentials: true }));
app.use(cors({ origin: ['http://localhost:3001', 'https://places.nomoreparties.co'], credentials: true }));

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
// });

// app.use(limiter);
app.use(cookies());
app.use(express.json());
app.use(helmet());

async function connector() {
  await mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
}

connector()
  .then(() => console.log('connect'))
  .catch((err) => console.error(err));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
