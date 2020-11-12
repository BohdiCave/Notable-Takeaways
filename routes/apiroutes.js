const fs = require("fs");
let db = require("../db/db.json");

module.exports = (app) => {
    
    app.get("/api/notes", (req, res) => {
        console.log(req);
        console.log(res.json(db));
        res.json(db);
    });
  
    app.post("/api/notes", (req, res) => {
        let note = req.body;
        db.push(note);
        db = JSON.stringify(db, null, 2);
        fs.writeFile("db/db.json", db, err => {if (err) throw err;})            
        return note;
    });

    app.delete("/api/notes/:id", (req, res) => {
        
        let notes = db;
        
        notes.forEach(note => {
            if (note.id === req.url) /* check on what the syntax should be */ {
                notes.pop(note);
            }
        });
        
        fs.writeFile("../db/db.json", res.json(notes));
    });
}