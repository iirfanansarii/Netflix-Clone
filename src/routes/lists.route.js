const router = require('express').Router();
const authToken = require('../middlewares/authToken');

const {
  createList,
  deleteList,
  findLists,
} = require('../controller/lists.controller');

router.post('/lists', authToken, createList);
router.delete('/list/:id', authToken, deleteList);
router.get('/lists', findLists);

module.exports = router;
