const express = require("express");
const app = express(); 
 
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(express.json());

require("./routes/htmlroutes")(app);

app.listen(PORT, () => {
  console.log("Server is listening on PORT: " + PORT);
});
