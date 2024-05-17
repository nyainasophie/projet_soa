const path = require('path');
const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.use(cors())
app.use(bodyparser.json())

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true }));

const db = require("./model");

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Tongasoa" });
});

//routes
require("./route/voitureRoute")(app);

// set port, listen for requests
const PORT = process.env.PORT || 3003;
const { sequelize, role } = require("./model");

db.sequelize.sync().then(()=>{
app.listen(PORT, () => {
  console.log(`Notre application node est démmarée sur ${PORT}.`);
});
})

