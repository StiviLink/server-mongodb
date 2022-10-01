const produit = require("../controllers/produit.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", produit.createProduit);
    // Retrieve all Taches
    router.get("/", produit.findAllProduit);
    // Retrieve all Sacs
    router.get("/sacs", produit.findAllSacs);
    router.patch("/", produit.findManyProduit);
    // Retrieve a single tache with id
    router.get("/:id", produit.findOneProduit);
    // Update a tache with id
    router.put("/:id", produit.updateProduit);
    // Delete a tache with id
    router.delete("/:id", produit.deleteProduit);
    // Create a new tache
    router.delete("/", produit.deleteAllProduit);
    app.use('/api/produits', router);
};