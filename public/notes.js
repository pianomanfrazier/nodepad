// this global will be replaced with the id from mongo
// each entry gets assigned its own _id
// var id = 0;

$(document)
    .ready(function() {
      // need to load the table from the database
      // upon startup

      // get json and for each into the table
      var tBody = $("tbody");
      $.getJSON("/notes", function(data) {
        console.log(JSON.stringify(data));
        $.each(data, function(i, note) {
          tBody.append(newRow(note._id, note.title, note.note));
        });
      });

      $("#create-note").click(addNote);
      var table = $("#noteTable");
      table.on("click", ".del-note", deleteNote);
      table.on("click", ".edit-note", editNote);
      table.on("click", ".submit-edit", submitEdit);
    });

function deleteNote() {
  var id = $(this).parent().siblings(".id").text();
  var title = $(this).parent().siblings(".title").text();
  var x = confirm("Delete this note?\n\nTitle: " + title + "\nID: " + id);
  if (x) {
    $(this).closest("tr").remove();

    // ajax call to db DEL
    $.ajax({
       url : "/notes/" + id,
       type : "DELETE",
       success : function(data) { console.log(JSON.stringify(data)); }
     }).fail(function(err) {
      alert("Failed to delete note.");
      console.log(JSON.stringify(err));
    });
  }
}

function editNote() {
  var note = $(this).parent().siblings(".note").text();
  var title = $(this).parent().siblings(".title").text();
  var id = $(this).parent().siblings(".id").text();
  var row = $(this).closest("tr");
  row.replaceWith(
      "<tr><td class=\"id\">" + id +
      "</td><td class=\"title\"><textarea class=\"form-control\">" + title +
      "</textarea></td><td class=\"note\"><textarea class=\"form-control\">" +
      note +
      "</textarea></td><td><button class=\"submit-edit btn btn-success btn-sm\" type=\"button\">Submit Edit</button></td><td></td></tr>");
}

function submitEdit() {
  var note = $(this).parent().siblings(".note").children("textarea").val();
  var title = $(this).parent().siblings(".title").children("textarea").val();
  var id = $(this).parent().siblings(".id").text();
  var row = $(this).closest("tr");
  row.replaceWith(newRow(id, title, note));

  // ajax call to db UPDATE
  $.post({
     url : "/notes/" + id,
     data : {"note" : note, "title" : title},
     success : function(data) {
       console.log("Note updated:\n\n" + JSON.stringify(data));
     },
     dataType : "json"
   }).fail(function(err) {
    alert("Failed to update note.\n\n");
    console.log(JSON.stringify(err));
  });
}

function addNote() {
  var noteArea = $("#note-text");
  var noteTitle = $("#note-title");
  var note = noteArea.val();
  var title = noteTitle.val();
  noteArea.val('');  // clear the textarea
  noteTitle.val(''); // clear the textarea

  // ajax call to db CREATE
  $.post({
     url : "/notes",
     data : {"note" : note, "title" : title},
     success : function(data) {
       $("tbody").append(newRow(data._id, data.title, data.note));
       console.log("Note created: " + JSON.stringify(data));
     },
     dataType : "json"
   }).fail(function(err) {
    alert("Failed to create note.");
    console.log(JSON.stringify(err));
  });
}

function newRow(id, title, note) {
  return "<tr><td class=\"id\">" + id + "</td><td class=\"title\">" + title +
         "</td><td class=\"note\"><p>" + note +
         "</p></td><td><button class=\"del-note btn btn-warning btn-sm\" type=\"button\">Delete</button></td><td><button class=\"edit-note btn btn-info btn-sm\" type=\"button\">Edit</button></td></tr>";
}
