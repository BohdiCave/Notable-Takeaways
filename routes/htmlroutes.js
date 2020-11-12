const path = require("path");
const fs = require("fs");
let db = require("../db/db.json");

module.exports = (app) => {

    app.get("/api/notes", (req, res) => {
        let notes = db;
        res.json(notes);
    });

    app.post("/api/notes", (req, res) => {
        let note = req.body;
        let notes = db;
        notes.push(note);
        notes = JSON.stringify(notes, null, 2);
        fs.writeFile("db/db.json", notes, err => {if (err) throw err;});
        res.json(note);
    });

    app.delete("/api/notes/:id", (req, res) => {
        let notes = db;
        notes.forEach((note, index, notes) => {
            if (note.id === req.params.id) {
                notes.splice(index, 1);
            }
        });
        notes = JSON.stringify(notes, null, 2);
        fs.writeFile("db/db.json", notes, err => {if (err) throw err;});
        res.json(notes);
    });

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html")); 
    });
};