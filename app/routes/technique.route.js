const techniques = require("../controllers/technique.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", techniques.createTechnique);
    // Retrieve all Taches
    router.get("/", techniques.findAllTechniques);
    // Retrieve all realised Taches
    router.get("/magiques", techniques.findAllMagicTechnique);
    // Retrieve a single tache with id
    router.get("/:id", techniques.findOneTechnique);
    // Update a tache with id
    router.put("/:id", techniques.updateTechnique);
    // Delete a tache with id
    router.delete("/:id", techniques.deleteTechnique);
    // Create a new tache
    router.delete("/", techniques.deleteAllTechnique);
    app.use('/api/techniques', router);
};