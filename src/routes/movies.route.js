const router = require('express').Router();

const {
  createNewMovie,
  updateMovie,
  deleteMovie,
  getMovie,
  getRandomMovie,
  getAllMovies,
} = require('../controller/movies.controller');

const authToken = require('../middlewares/authToken');

router.post('/create/movie', authToken, createNewMovie);
router.put('/movie/:id', authToken, updateMovie);
router.delete('/movie/:id', authToken, deleteMovie);
router.get('/movies/all', authToken, getAllMovies);
router.get('/movie/:id', getMovie);
router.get('/random/movie', getRandomMovie);

module.exports = router;
