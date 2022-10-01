const possession = require("../controllers/possession.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", possession.createPossession);
    // Retrieve all Taches
    router.get("/", possession.findAllPossession);
    // Retrieve all Sacs
    router.get("/sac", possession.findAllSacPossession);
    // Retrieve a single tache with id
    router.get("/:id", possession.findOnePossession);
    // Update a tache with id
    router.put("/:id", possession.updatePossession);
    // Delete a tache with id
    router.delete("/:id", possession.deletePossession);
    // Create a new tache
    router.delete("/", possession.deleteAllPossession);
    app.use('/api/possession', router);
};