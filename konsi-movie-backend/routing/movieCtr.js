
const express = require('express');
const router = express.Router();
const Movie = require('../schema/schemas');
const ReportedMovie = require('../schema/reportedMovieSchema'); 
const asyncHandler = require("express-async-handler");


// Example route for testing
router.get('/ok', async (req, res) => {
  res.send("ok working");
});

// GET route for fetching all movies
// const GetAllMoives = asyncHandler( async (req, res) => {
//   try {
//     const movies = await Movie.find(); // Fetch all movies from the database
//     res.status(200).json(movies); // Return movies as JSON response
//   } catch (err) {
//     res.status(500).json({ message: 'Error fetching movies' });
//   }
// });

//old raj
router.get('/api/all', async (req, res) => {
  try {
    const movies = await Movie.find(); // Fetch all movies from the database
    res.status(200).json(movies); // Return movies as JSON response
  } catch (err) {
    res.status(500).json({ message: 'Error fetching movies' });
  }
});


const UserMessage = require('../schema/Msg');
// POST route for posting a message
// router.post('/api/message',async(req,res)=>{
//   try{
//     const {title,message} = req.body;
//     const newMsg = new UserMessage({
//       title,
//       message
//     });
//     const savedMessage = await newMsg.save();
//     res.status(201).json({message:'Message posted successfully',savedMessage});
//   }catch(err){
//     console.log('Error Posting message',err);
//     res.status(500).json({message:'Error posting message'});
//   };
// });

//new raj
// const UsersMessage = asyncHandler(async (req, res) => {
//   try {
//     // Trim inputs to remove unnecessary whitespace
//     const title = req.body.title?.trim();
//     const message = req.body.message?.trim();

//     // Validate required fields after trimming
//     if (!title || !message) {
//       return res.status(400).json({ message: 'Title and message are required' });
//     }

//     // Create and save the new message
//     const newMsg = new UserMessage({
//       title,
//       message,
//     });

//     const savedMessage = await newMsg.save();
//     res.status(201).json({ message: 'Message posted successfully', savedMessage });
//   } catch (err) {
//     console.error('Error posting message:', err);
//     res.status(500).json({ message: 'Error posting message' });
//   }
// });

//old raj
router.post('/api/message', async (req, res) => {
  try {
    // Trim inputs to remove unnecessary whitespace
    const title = req.body.title?.trim();
    const message = req.body.message?.trim();

    // Validate required fields after trimming
    if (!title || !message) {
      return res.status(400).json({ message: 'Title and message are required' });
    }

    // Create and save the new message
    const newMsg = new UserMessage({
      title,
      message,
    });

    const savedMessage = await newMsg.save();
    res.status(201).json({ message: 'Message posted successfully', savedMessage });
  } catch (err) {
    console.error('Error posting message:', err);
    res.status(500).json({ message: 'Error posting message' });
  }
});



// POST route for posting a new movie
// router.post('/api/posting', async (req, res) => {
//   try {
//     const { name, director, rating, genre, about, urview } = req.body;

//     // Ensure all required fields are present
//     if (!name || !director || !rating || !genre || !about || !urview) {
//       return res.status(400).json({ message: 'All required fields must be provided'});
//     }

//     const newMovie = new Movie({
//       name,
//       director,
//       rating,
//       genre,
//       about,
//       urview,
//     });

//     await newMovie.save();
//     res.status(201).json({ message: 'Movie posted successfully', movie: newMovie });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error posting movie' });
//   }
// });

// //new raj
// const PostMovie = asyncHandler( async (req, res) => {
//   try {
//     // Trim each field to remove extra spaces
//     const {
//       name,
//       director,
//       rating,
//       genre,
//       about,
//       urview,
//       imgurl,
//     } = req.body;

//     const trimmedData = {
//       name: name?.trim(),
//       director: director?.trim(),
//       rating: rating?.trim(),
//       genre: genre?.trim(),
//       about: about?.trim(),
//       urview: urview?.trim(),
//       imgurl,
//     };

//     // Ensure all required fields are present after trimming
//     if (
//       !trimmedData.name ||
//       !trimmedData.director ||
//       !trimmedData.rating ||
//       !trimmedData.genre ||
//       !trimmedData.about ||
//       !trimmedData.urview
//     ) {
//       return res.status(400).json({ message: 'All required fields must be provided' });
//     }

//     // const newMovie = new Movie({trimmedData});
//     const newMovie = new Movie(trimmedData);

//     await newMovie.save();

//     res.status(201).json({ message: 'Movie posted successfully', movie: newMovie });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error posting movie' });
//   }
// });

//old raj
router.post('/api/posting', async (req, res) => {
  try {
    // Trim each field to remove extra spaces
    const {
      name,
      director,
      rating,
      genre,
      about,
      urview,
      imgurl,
    } = req.body;

    const trimmedData = {
      name: name?.trim(),
      director: director?.trim(),
      rating: rating?.trim(),
      genre: genre?.trim(),
      about: about?.trim(),
      urview: urview?.trim(),
      imgurl,
    };

    // Ensure all required fields are present after trimming
    if (
      !trimmedData.name ||
      !trimmedData.director ||
      !trimmedData.rating ||
      !trimmedData.genre ||
      !trimmedData.about ||
      !trimmedData.urview
    ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    // Use the sanitized data when creating the new movie
    const newMovie = new Movie({trimmedData});
    await newMovie.save();

    res.status(201).json({ message: 'Movie posted successfully', movie: newMovie });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error posting movie' });
  }
});



// PUT route for updating a movie
// router.put('/api/update/:id', async (req, res) => {
//   try {
//     const movieId = req.params.id;  // Get movie ID from URL parameters
//     const { name, director, review, rating, genre, about, urview } = req.body;

//     const updatedMovie = await Movie.findByIdAndUpdate(
//       movieId,  // Find the movie by ID
//       { name, director, review, rating, genre, about, urview },  // Fields to update
//       { new: true }  // Return the updated document
//     );

//     if (!updatedMovie) {
//       return res.status(404).json({ message: 'Movie not found' });
//     }

//     res.status(200).json({ message: 'Movie updated successfully', movie: updatedMovie });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error updating movie' });
//   }
// });

// DELETE route for deleting a movie
//old raj
// router.delete('/api/delete/:id', async (req, res) => {
//   try {
//     const movieId = req.params.id;  // Get movie ID from URL parameters

//     const deletedMovie = await Movie.findByIdAndDelete(movieId);

//     if (!deletedMovie) {
//       return res.status(404).json({ message: 'Movie not found' });
//     }

//     res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting movie' });
//   }
// });

//new raj
// const DeleteMoviePost = asyncHandler(async (req, res) => {
//   try {
//     const movieId = req.params.id;  // Get movie ID from URL parameters

//     const deletedMovie = await Movie.findByIdAndDelete(movieId);

//     if (!deletedMovie) {
//       return res.status(404).json({ message: 'Movie not found' });
//     }

//     res.status(200).json({ message: 'Movie deleted successfully', movie: deletedMovie });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Error deleting movie' });
//   }
// });

// Route to report a movie
router.post('/api/report/:id', async (req, res) => {
  const movieId = req.params.id;
  console.log("debugging from backend checking if id reached here or not",movieId);
  try {
    // Find the movie in the Movie collection
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    // Remove the movie from the Movie collection
    await Movie.findByIdAndDelete(movieId);

    // Add the movie to the ReportedMovies collection
    const reportedMovie = new ReportedMovie({
      name: movie.name,
      director: movie.director,
      review: movie.review,
      rating: movie.rating,
      genre: movie.genre,
      about: movie.about,
      urview: movie.urview,
      reported: true, // Mark as reported
    });

    // Save the reported movie
    await reportedMovie.save();

    res.json({ message: 'Movie reported and moved to ReportedMovies', isReported: true });
  } catch (error) {
    console.error('Backend Error reporting movie:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// module.exports = {
//   UsersMessage,
//   PostMovie,
//   GetAllMoives,
//   // DeleteMoviePost,
// };

module.exports = router;