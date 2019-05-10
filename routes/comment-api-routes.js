var db = require("../models");

module.exports = function (app) {
  // Get all comments
  app.get("/api/comments", function (req, res) {
    db.Comment.findAll(
      { limit: 10, order: [['like', 'DESC']] }
    ).then(function (dbcomments) {
      res.json(dbcomments);
    });
  });

  // Create a new comment
  app.post("/api/comments", function (req, res) {
    db.Comment.create(req.body).then(function (dbcomment) {
      res.json(dbcomment);
    });
  });

  app.put("/api/comments/:id", function (req, res) {
    db.Comment.increment({ like: + 1 }, { where: { id: req.params.id } }).then(function (dbcomment) {
      res.json(dbcomment);
    });
  });

  // Delete an comment by id
  app.delete("/api/comments/:id", function (req, res) {
    db.Comment.destroy({ where: { id: req.params.id } }).then(function (dbcomment) {
      res.json(dbcomment);
    });
  });
};

  //   WORKS FOR EXISTING ENTRIES 
  //   app.put("/api/comments/:id", function (req, res) {
  //   db.comment3.increment( { like: + 1 }, { where: { id: req.params.id } }).then(function (dbcomment) { 
  //     res.json(dbcomment);
  //   });
  // });

  // app.put("/api/comments/:id", function (req, res) {
  //   db.comment3.increment({ like: + 5 }, { where: { id: req.params.id } }).then(function (dbcomment) {
  //     res.json(dbcomment);
  //     console.log(req.params.id)
  //   });
  // });

  // Works for few comments
  // app.put("/api/comments/:id", function (req, res) {
  //   db.comment3.increment({ like: +1 }, { where: { id: req.params.id } }).then(function (dbcomment) {
  //     res.json(dbcomment);
  //   });
  // });