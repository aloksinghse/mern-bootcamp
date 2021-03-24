const Category = require("../models/Category");
const User = require("../models/User");
const { Order } = require("../models/Order");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    req.category = category;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Not able to save Category in db",
      });
    }
    return res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};


exports.getAllCategories = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err) {
      return res.status(400).json({
        error: "No Category found in db",
      });
    }
    return res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Category not updated",
      });
    }
    return res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  const category = req.category;
  const categoryName = category.name;
  category.remove((err, updatedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Category not updated",
      });
    }
    return res.json({
      message: categoryName + " Successfully Deleted !",
    });
  });
};
