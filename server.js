

// Dependencies for Require 
const fs = require("fs");
const express = require("express");
const path = require("path");

// This is  Setting for  express
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//This is for route to read the `db.json` 
app.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/db/db.json"));
});
app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
});



// Create a function  for post note  the requests and responses 
app.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();
    newNote.id = notelength;
    noteList.push(newNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})



// Create a function for handling the requests and responses for delete note 
app.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});

// For listen to the PORT
app.listen(PORT, () => console.log("Listening on PORT: " + PORT));