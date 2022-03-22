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


const session = require('express-session');
let RedisStore = require('connect-redis')(session)

app.use(
  session({
    store: new RedisStore({client : require('./db/redis')}),
    saveUninitialized: false,
    secret: "keyboard cat",
    resave: false
  })
)

//ROUTES
app.use('', require('./routes/payRoute') );
app.get('/', (req, res) =>{
  res.status(200).send("LANNISTER PAY API!")
});
app.all('**', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});


app.use(appErrorHandler);

module.exports = app;
