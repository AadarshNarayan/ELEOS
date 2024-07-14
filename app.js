var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var hbs = require('express-handlebars');

const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const pool = require('./db');

const checkAuth = require('./middleware/checkAuth');

var userRouter = require('./routes/user');
var adminRouter = require('./routes/admin');

var app = express();
var db=require('./config/connection');
var session =require('express-session');
const { execFileSync } = require('child_process');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs',hbs.engine({extname:'hbs',defaultLayout:'layout',layoutsDir:__dirname+'/views/layout/',partialsDir:__dirname+'/views/partials/'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:"Key",cookie:{maxAge:600000},resave:true,saveUninitialized:true}))


app.use('/user', userRouter);
app.use('/admin', adminRouter);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/register.html');
});


app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.post('/register', async (req, res) => {
  const { username,emailid, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query('INSERT INTO userss (username,emailid, password) VALUES ($1, $2, $3)', [username,emailid,hashedPassword]);
   
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.send('Error registering user.');
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM userss WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.session.user = username;  
        res.redirect('/user');
        
      } else {
        res.send('Login error .Invalid username or password');
      }
    } else {
      res.send('Login error');
    }
  } catch (err) {
    console.error(err);
    res.send('Error');
  }
});


app.use(function(req, res, next) {
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
