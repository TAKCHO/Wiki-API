//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const { response } = require("express");
const req = require("express/lib/request");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String,
};

const Article = mongoose.model("Article", articleSchema);

app.route("/articles")
    .get(function(req,res){
    Article.find(function(err, foundArticles){
        if (!err){
            res.send(foundArticles);
         } else {
            res.send(err);
        }
     });
      })
    .post(function(req,res){
      console.log();
      console.log();
    
     const newArticle = new Article ({
        title: req.body.title,
        content: req.body.content
      });

      newArticle.save(function(err){
        if (!err){
            res.send("Successfully added  new article.");
        } else {
            res.send(err);
        }
            
      });
    })
   .delete(function(req,res){
     Article.deleteMany(function(err){
        if (!err){
            res.send("Successfully deleted all article.");
        } else {
            res.send(err);
        }
    });
});


///////////////////Requests Targetting A Specific Article//////////////

// localhost:3000/articles/Jack-Bauer

app.route("/articles/:articleTitle")
 
//  req.params.artcleTitle = "Jack-Bauer"

.get(function(req,res){

  Article.findOne({title: req.params.articleTitle}, function(err, foundArticle){
      if (foundArticle){
          res.send(foundArticle);
      } else {
          res.send("No articles matching that title was found.");
      }
  });
});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});