const morgan          = require('morgan');
const express         = require('express');
const AppError        = require('./errors/appError');
const appErrorHandler = require('./errors/app_error_handler');

const app = express();

//Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// enable morgan
app.use(morgan('dev'));


//ROUTES

app.get('/', (req, res) =>{
  res.status(200).send("Api Working!")
});

app.all('**', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(appErrorHandler);

module.exports = app;
