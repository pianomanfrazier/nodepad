var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
  note : { type: String, required: true },
  title : { type: String, required: true, unique: true },
  user : { type : String, required : true },
  created_at : Date,
  updated_at : Date
});

noteSchema.pre( 'save', function(next) {
  var currentDate = new Date(); 

  this.updated_at = currentDate;

  if (!this.created_at) {
    this.created_at = currentDate;
  }

  next();
});

module.exports = mongoose.model('Note', noteSchema);
