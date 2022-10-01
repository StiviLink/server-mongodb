const lieu = require("../controllers/lieu.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", lieu.createLieu);
    // Retrieve all Taches
    router.get("/", lieu.findAllLieux);
    // Retrieve a single tache with id
    router.get("/:id", lieu.findOneLieu);
    // Update a tache with id
    router.put("/:id", lieu.updateLieu);
    // Delete a tache with id
    router.delete("/:id", lieu.deleteLieu);
    // Create a new tache
    router.delete("/", lieu.deleteAllLieux);
    app.use('/api/lieux', router);
};