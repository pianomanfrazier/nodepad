//this global will be replaced with the id from mongo
//each entry gets assigned its own _id
var id = 0;

$( document ).ready( function() {
  var table = $("#noteTable");
  var add = $("#create-note");
  table.on("click",".del-note", deleteNote );
  table.on("click",".edit-note", editNote );
  table.on("click",".submit-edit", submitEdit );
  add.click( addNote );
});

function deleteNote() {
  var x = confirm("Delete this note?");
  if (x) {
    $(this).closest("tr").remove();
  }
}

function editNote() {
  var note = $(this).parent().siblings(".note").text();
  var title = $(this).parent().siblings(".title").text();
  var id = $(this).parent().siblings(".id").text();
  var row = $(this).closest("tr");
  row.replaceWith("<tr><td class=\"id\">" + id + "</td><td class=\"title\"><textarea class=\"form-control\">" + title + "</textarea></td><td class=\"note\"><textarea class=\"form-control\">" + note + "</textarea></td><td><button class=\"submit-edit btn btn-success btn-sm\" type=\"button\">Submit Edit</button></td><td></td></tr>");
}

function submitEdit() {
  var note = $(this).parent().siblings(".note").children("textarea").val();
  var title = $(this).parent().siblings(".title").children("textarea").val();
  var id = $(this).parent().siblings(".id").text();
  var row = $(this).closest("tr");
  console.log(note);
  row.replaceWith(newRow(id, title,  note));
}

function addNote() {
  var noteArea = $("#note-text");
  var noteTitle = $("#note-title");
  var note = noteArea.val();
  var title = noteTitle.val();
  $("tbody").append(newRow(id++, title, note));
  noteArea.val(''); //clear the textarea
  noteTitle.val(''); //clear the textarea
}

function newRow(id, title, note) {
  return "<tr><td class=\"id\">" + id + "</td><td class=\"title\">" + title + "</td><td class=\"note\"><p>" + note + "</p></td><td><button class=\"del-note btn btn-warning btn-sm\" type=\"button\">Delete</button></td><td><button class=\"edit-note btn btn-info btn-sm\" type=\"button\">Edit</button></td></tr>";
}
