const express = require('express');

require('dotenv').config();

const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const { PORT = 3000, DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

const helmet = require('helmet');

const { celebrate, Joi, errors } = require('celebrate');
const { signinSchema, signupSchema } = require('./validation/JoiValidation');

const { login, createUser } = require('./controllers/users');

const cors = require('./middlewares/cors');

const auth = require('./middlewares/auth');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
})
  .then(
    () => {
      console.log('Connected to MongoDB');
    },
    (err) => {
      console.log(`Ошибка ${err}`);
    },
  );

app.use(cors);

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', signupSchema, createUser);
app.post('/signin', signinSchema, login);

app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не существует.'));
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
