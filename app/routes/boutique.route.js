const boutique = require("../controllers/boutique.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", boutique.createBoutique);
    // Retrieve all Taches
    router.get("/", boutique.findAllBoutiques);
    // Retrieve a single tache with id
    router.get("/:id", boutique.findOneBoutique);
    // Update a tache with id
    router.put("/:id", boutique.updateBoutique);
    // Delete a tache with id
    router.delete("/:id", boutique.deleteBoutique);
    // Create a new tache
    router.delete("/", boutique.deleteAllBoutique);
    app.use('/api/boutiques', router);
};