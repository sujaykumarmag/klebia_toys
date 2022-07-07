const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const connectDB = require('./config/db');
const {errorHandler} = require('./middlewares/error');

// Configuring the .env (environment variables)
dotenv.config({ path: "./config/.env" });

// Connecting to Database
connectDB();

// Initializing express app
const app = express();

// Middlewares for body parser 
app.use(express.json());

// Using a middleware Logger
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // 3rd party logger
}

// Route files
const toys = require('./routes/toys');
const users = require('./routes/users');

// Mounting routers
app.use('/api/v1/toys', toys);
app.use('/api/v1/users', users)

// Home directory route
app.get('/', (req, res) => {
    res.status(200).json({success : true, msg: " Hello World"});
})
// Using the error Handler
app.use(errorHandler);


// Creating the http server and opening a PORT to listen
app.listen(process.env.PORT, () => {
    console.log(`Server is up and running in Port ${process.env.PORT}`)
})



// npm start --> production mode
// npm run dev --> development mode