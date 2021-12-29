const {
  newListCreated,
  notAuthToCreateList,
  notAuthToDeleteList,
  listFethed,
} = require('../cosntants/error.message');
const List = require('../models/list.model');

exports.createList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newlist = new List(req.body);
      const savedlist = await newlist.save();
      return res.status(201).json({
        message: newListCreated,
        list: savedlist,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json({
      message: notAuthToCreateList,
    });
  }
};

exports.deleteList = (req, res) => {
  if (req.user.isAdmin) {
    try {
      const deletedList = List.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        message: listDeleted,
        deletedList,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  } else {
    return res.status(403).json({
      message: notAuthToDeleteList,
    });
  }
};

exports.findLists = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let lists = [];

  try {
    if (typeQuery) {
      if (genreQuery) {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        lists = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      lists = await List.aggregate([{ $sample: { size: 10 } }]);
    }
    return res.status(200).json({
      message: listFethed,
      records: lists.length,
      lists,
    });
  } catch (err) {
    return res.status(500).json(err.message);
  }
};

