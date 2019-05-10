var db = require("../models");
var path = require("path");
module.exports = function (app) {
  //Load index page
  app.get("/commentPost/:id", function (req, res) {
    db.Post.findOne({where: {id: req.params.id}, include: [db.Comment]}).then(function (results) {
      console.log(results.Comments);
      var hbObj = {
        post: results,
        comments: results.Comments
      }
      res.render("index", hbObj);

    });
  });
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  //--------------WORKS ON HTML PAGES-------------------------------/
  // app.get("/", function (req, res) {
  //   res.sendFile(path.join(__dirname, "/../models/user.js"));
  // });
  //--------------WORKS ON HTML PAGES-------------------------------/

  // index route loads view.html
  // app.get("/", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/blog.html"));
  // });

  // cms route loads cms.html
  app.get("/cms", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/cms.html"));
  });

  // blog route loads blog.html
  app.get("/blog", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/blog.html"));
  });

  // authors route loads author-manager.html
  app.get("/authors", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/author-manager.html"));
  });

  app.get("/api/comments", function (req, res) {
    db.comment3.findAll({}).then(function (dbcomments) {
      res.json(dbcomments);
    });
  });



  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
