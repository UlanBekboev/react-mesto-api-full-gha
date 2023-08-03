const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors, Joi, celebrate } = require('celebrate');
const validator = require('validator');
const NotFoundError = require('./errors/not-found-err');
const BadRequestError = require('./errors/bad-request-err');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const rootRouter = require('./routes/index');
const { SERVER_PORT, DB } = require('./utils/config');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signIn, signUp } = require('./middlewares/validations');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(helmet());

mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors);

app.use(requestLogger)

app.post('/signin', signIn, login);
app.post('/signup', signUp, createUser);

app.use(auth);
app.use('/', rootRouter);

app.use(errorLogger);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});
app.use(errors());
app.use(errorHandler);

app.listen(SERVER_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${SERVER_PORT}`);
});
