const village = require("../controllers/village.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", village.createVillage);
    // Retrieve all Taches
    router.get("/", village.findAllVillage);
    // Retrieve a single tache with id
    router.get("/:id", village.findOneVillage);
    // Update a tache with id
    router.put("/:id", village.updateVillage);
    // Delete a tache with id
    router.delete("/:id", village.deleteVillage);
    // Create a new tache
    router.delete("/", village.deleteAllVillage);
    app.use('/api/villages', router);
};