const Movie = require('../models/movie.model');
const {
  unAuthorised,
  newMovieCreated,
  movieUpdated,
  unAuthorisedToUpdateMovie,
  unAuthorisedToDeleteMovie,
  movieDeleted,
  movieFound,
  moviesFetched,
  notAuthToFecthMovies,
} = require('../cosntants/error.message');
const { findOneAndUpdate } = require('../models/movie.model');

exports.createNewMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newMovie = new Movie(req.body);
      const savedMovie = await newMovie.save();
      return res.status(201).json({
        message: newMovieCreated,
        movie: savedMovie,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json({
      message: unAuthorised,
    });
  }
};

exports.updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await new findOneAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      return res.status(200).json({
        message: movieUpdated,
        movie: updatedMovie,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json({
      message: unAuthorisedToUpdateMovie,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: movieDeleted,
        deletedMovie,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json({
      message: unAuthorisedToDeleteMovie,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    return res.status(200).json({
      message: movieFound,
      movie,
    });
  } catch (err) {
    return res.status(200).json(err.message);
  }
};

exports.getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === 'series') {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: true },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    } else {
      movie = await Movie.aggregate([
        {
          $match: { isSeries: false },
        },
        {
          $sample: { size: 1 },
        },
      ]);
    }
    return res.status(200).json({
      message: movieFound,
      movie,
    });
  } catch (err) {
    return res.status(200).json(err.message);
  }
};

exports.getAllMovies = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      return res.status(200).json({
        message: moviesFetched,
        movies,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json({
      message: notAuthToFecthMovies,
    });
  }
};
