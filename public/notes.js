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
  var row = $(this).closest("tr");
  console.log(note);
  row.replaceWith("<tr><td class=\"note\"><textarea class=\"form-control\">" + note + "</textarea></td><td><button class=\"submit-edit btn btn-success btn-sm\" type=\"button\">Submit Edit</button></td><td></td></tr>");
}

function submitEdit() {
  var note = $(this).parent().siblings(".note").children("textarea").val();
  var row = $(this).closest("tr");
  console.log(note);
  row.replaceWith(newRow(note));
}

function addNote() {
  var noteArea = $("#note-text");
  var note = noteArea.val();
  console.log(note);
  $("#noteTable tr:last").after(newRow(note)); 
  noteArea.val('');
}

function newRow(note) {
  return "<tr><td class=\"note\"><p>" + note + "</p></td><td><button class=\"del-note btn btn-warning btn-sm\" type=\"button\">Delete</button></td><td><button class=\"edit-note btn btn-info btn-sm\" type=\"button\">Edit</button></td></tr>";
}
