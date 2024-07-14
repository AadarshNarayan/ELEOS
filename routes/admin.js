const express = require('express');
const path = require('path');
const router = express.Router();
const checkAdminAuth=require('../middleware/checkAdminAuth');
const exphbs = require('express-handlebars');
const { Pool } = require('pg');
const pool = require('../db');


const hbs = exphbs.create({
  defaultLayout: 'main',
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  }
});


router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin/admin-login.html'));
});

// Handle admin login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    req.session.adminLoggedIn = true;  
    res.redirect('/admin/home');
  } else {
    res.send('Invalid username or password');
  }
});
router.get('/alluser', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/admin/allusers.html'));
});


router.get('/alluser/data', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM userss');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});


router.get('/home',checkAdminAuth, function(req, res, next) {
  res.render('index',{admin:true});
});

module.exports = router;
