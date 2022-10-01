const quartier = require("../controllers/quartier.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", quartier.createQuartier);
    // Retrieve all Taches
    router.get("/", quartier.findAllQuartier);
    // Retrieve a single tache with id
    router.get("/:id", quartier.findOneQuartier);
    // Update a tache with id
    router.put("/:id", quartier.updateQuartier);
    // Delete a tache with id
    router.delete("/:id", quartier.deleteQuartier);
    // Create a new quartier
    router.delete("/", quartier.deleteAllQuartier);
    app.use('/api/quartiers', router);
};