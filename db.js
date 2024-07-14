const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',       r
  host: 'localhost',          
  database: 'login',  
  password: 'password_of_postgres', 
  port: 5432,                 

module.exports = pool;
