// //old raj
// // const express = require('express');
// // const app = express();
// // const cors = require('cors');
// // const bodyParser = require('body-parser');
// // const path = require('path');
// // const routei = require('./routing/routei');
// // const userRoute = require('./routes/userRoute');
// // const cookieParser = require('cookie-parser');

// // const routei = require('./routing/routei');   
// // const userRoute = require('./routes/userRoute');

// // require('dotenv').config();
// // require('./connection/condb');  // MongoDB connection

// // const PORT = process.env.PORT || 5000;

// // app.use(express.json()); // Middleware to parse JSON
// // app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// // // app.use(cors());
// // app.use(bodyParser.json());

// // app.use(cors({
// //     origin: 'http://localhost:5173',
// //     credentials: true,
// //   }));

// // //middleware
// // const cookieParser = require('cookie-parser');
// // app.use(cookieParser()); 


// // //'/movies' prefix
// // app.use('/movies', routei);
// // app.use('/users', userRoute);

// // app.get('/oko', (req, res) => {
// //     res.send('Konsi-Movie Backend is running raj');
// // });

// // app.listen(PORT, () => {
// //     console.log(`Server is running on http://localhost:${PORT}`);
// // });



// //new raj
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const cookieParser = require('cookie-parser');

// const movieCtr = require('./routing/movieCtr');      // Movies route
// const userRoute = require('./routes/userRoute');    // User route
// const likeRoute = require('./routes/likesRoute');

// require('./connection/condb');  // MongoDB connection

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.urlencoded({ extended: true }));

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   express.urlencoded({
//     extended: false,
//   })
// );
// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: ['https://konsi-movies.vercel.app'],
//     // origin: ['http://localhost:5173','https://konsi-movies.vercel.app'],
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     credentials: true,
//   })
// );

// // Route middleware
// app.use('/movies', movieCtr);
// app.use('/users', userRoute);
// app.use('/likes',likeRoute);


// // Default route
// app.get('/oko', (req, res) => {
//   res.send('Konsi-Movie Backend is running raj');
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });

//old
// app.get("/",(req,res)=>{
  //   const ip = 
  //     req.headers['cf-connecting-ip'] ||
  //     req.headers['x-real-ip'] ||
  //     req.headers['x-forwarded-for'] || 
  //     req.socket.remoteAddress || "";


  //   return res.json({
  //     ip,
  //   })
  // })

//new raj

  const express = require('express');
  const mongoose = require('mongoose');
  const cookieParser = require('cookie-parser');
  const cors = require('cors');
  const rateLimit = require('express-rate-limit');

  // Routes
  const movieCtr = require('./routing/movieCtr');
  const userRoute = require('./routes/userRoute');
  const likeRoute = require('./routes/likesRoute');
  const movieAiRoute = require('./routes/movieAiRoute');

  // DB connection
  require('dotenv').config();
  require('./connection/condb');  

  const app = express();
  const PORT = process.env.PORT || 5000;

  const limiter = rateLimit({
    windowMs:15*60*1000,
    max:50,
    message:"Too Many request from your side,please try again later",
    standardHeadersstandardHeaders: true,
    legacyHeaders: false,
  });

  // ✅ Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  // ✅ CORS setup
  app.use(
    cors({
      origin: [
          'https://konsi-movies.vercel.app',
          // 'https://konsi-movies.vercel.app',
          'https://konsi-movie-frontend-9c5edzh1w-raj-shekhar-vermas-projects.vercel.app',
          'http://localhost:5173',
        ],
      methods: ['GET', 'POST', 'PUT', 'DELETE'],
      credentials: true,
    })
  );


  app.set('trust proxy', 1);
  // app.use('/movies', limiter);
  app.use('/users', limiter);

  // ✅ Routes
  app.use('/movies', movieCtr);
  app.use('/users', userRoute);
  app.use('/likes', likeRoute);
  app.use("/movieai",movieAiRoute);

  // ✅ Test route
  app.get('/raj', (req, res) => {
    res.send('Konsi-Movie Backend is running raj');
  });


  // ✅ Start server
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });

// // working urls 
// //GET ALL MOVIES http://localhost:3000/movies/api/all
// //POST posting http://localhost:3000/movies/api/posting
// //POST report http://localhost:3000/movies/api/report/${movieId}
// //PUST update ​http://localhost:3000/movies/api/update/${movieID}
// //DELETE delete ​http://localhost:3000/movies/api/delete/${movieID}