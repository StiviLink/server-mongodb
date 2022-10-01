const category = require("../controllers/categoryProduit.controller.js");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", category.createCategory);
    // Retrieve all Taches
    router.get("/", category.findAllCategory);
    // Retrieve a single tache with id
    router.get("/:id", category.findOneCategory);
    // Update a tache with id
    router.put("/:id", category.updateCategory);
    // Delete a tache with id
    router.delete("/:id", category.deleteCategory);
    // Create a new tache
    router.delete("/", category.deleteAllCategory);
    app.use('/api/categoryProduits', router);
};