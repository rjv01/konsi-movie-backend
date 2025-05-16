//old raj
// const express = require('express');
// const app = express();
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const path = require('path');
// const routei = require('./routing/routei');
// const userRoute = require('./routes/userRoute');
// const cookieParser = require('cookie-parser');

// const routei = require('./routing/routei');   
// const userRoute = require('./routes/userRoute');

// require('dotenv').config();
// require('./connection/condb');  // MongoDB connection

// const PORT = process.env.PORT || 5000;

// app.use(express.json()); // Middleware to parse JSON
// app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// // app.use(cors());
// app.use(bodyParser.json());

// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//   }));

// //middleware
// const cookieParser = require('cookie-parser');
// app.use(cookieParser()); 


// //'/movies' prefix
// app.use('/movies', routei);
// app.use('/users', userRoute);

// app.get('/oko', (req, res) => {
//     res.send('Konsi-Movie Backend is running raj');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });



//new raj
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const movieCtr = require('./routing/movieCtr');      // Movies route
const userRoute = require('./routes/userRoute');    // User route
const likeRoute = require('./routes/likesRoute');

require('./connection/condb');  // MongoDB connection

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

app.use(
  cors({
    origin: ['https://konsi-movies.vercel.app'],
    // origin: ['http://localhost:5173','https://konsi-movies.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Route middleware
app.use('/movies', movieCtr);
app.use('/users', userRoute);
app.use('/likes',likeRoute);


// Default route
app.get('/oko', (req, res) => {
  res.send('Konsi-Movie Backend is running raj');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// working urls 
//GET ALL MOVIES http://localhost:3000/movies/api/all
//POST posting http://localhost:3000/movies/api/posting
//POST report http://localhost:3000/movies/api/report/${movieId}
//PUST update ​http://localhost:3000/movies/api/update/${movieID}
//DELETE delete ​http://localhost:3000/movies/api/delete/${movieID}