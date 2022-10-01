const avatars = require("../controllers/avatar_community.controller");
module.exports = app => {
    const router = require("express").Router();
    // Create a new Tache
    router.post("/", avatars.createAvatar);
    // Retrieve all Taches
    router.get("/", avatars.findAllAvatars);
    // Retrieve a single tache with id
    router.get("/:id", avatars.findOneAvatar);
    // Update a tache with id
    router.put("/:id", avatars.updateAvatar);
    // Delete a tache with id
    router.delete("/:id", avatars.deleteAvatar);
    // Create a new tache
    router.delete("/", avatars.deleteAllAvatars);
    app.use('/api/avatars_community', router);
};