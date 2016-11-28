module.exports = function(passport) {
  var router = require('express').Router();
  var Note = require('../models/note');

  //test the router
  router.get('/api', function(req,res) {
    res.render('test.pug', { message : "API route works" }); 
  });

  //CREATE
  router.post('/notes', function(req,res) {
    var note = new Note({
      note: req.body.note,
      title: req.body.title,
      user: req.user.local.name, //want to pass the session username
    });
    note.save((err) => {
      if (err)
        throw err; 
      console.log("note saved!");
      res.json(note);
    });
  });

  //READ
  router.get('/notes', function(req,res) {
    console.log(req.user.local.name);
    Note.find({"user" : req.user.local.name }, function(err, notes) {
      if (err) throw err;

      res.json(notes);
    });
  });

  //UPDATE
  router.post('/notes/:id', function(req,res) {
    Note.update({ _id : req.params.id }, {$set : {note: req.body.note, title: req.body.title } }, function() {
      console.log("note " + req.params.id + " updated");
    });
  });

  //DELETE
  router.delete('/notes/:id', function(req,res) {
    Note.find({_id : req.params.id }).remove( function() {
      console.log("note " + req.params.id + " removed");
    });
  });

  return router;
}
