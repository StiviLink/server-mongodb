const express = require("express");
const bodyParser = require("body-parser");
//const cors = require("cors");
const app = express();
const corsOptions = {
    origin: "http://localhost:3061"
};
const db = require("./app/models");
//app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//Connect
db.mongoose
    .connect(db.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });
// simple route
app.get("/", (req, res) => {
    res.json({ message: "Bienvenue dans mon Bot RP." });
});
require("./app/routes/avatar.routes")(app);
require("./app/routes/avatar_community.routes")(app);
require("./app/routes/technique.route")(app);
require("./app/routes/boutique.route")(app);
require("./app/routes/produit.route")(app)
require("./app/routes/possession.route")(app);
require("./app/routes/categoryProduit.route")(app);
require("./app/routes/village.route")(app);
require("./app/routes/quartier.route")(app);
require("./app/routes/lieu.route")(app);
// set port, listen for requests
const PORT = process.env.PORT || 3060;
app.listen(PORT, () => {
    console.log(`Serveur en cours sur le port ${PORT}.`);
});
