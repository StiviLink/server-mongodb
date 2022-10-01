const db = require("../models");
const Boutique = db.boutiques;
// Create and Save a new Avatar
exports.createBoutique = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Avatar
    const boutique = new Boutique({
        idBoutique: req.body.idBoutique,
        nom: req.body.nom,
        description: req.body.description ? req.body.description : "~Aucune description~",
        localisation: req.body.localisation ? req.body.localisation : "ARCADIAS"
        });
    // Save Avatar in the database
    boutique
        .save(boutique)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Avatar."
            });
        });
};
// Retrieve all Taches from the database.
exports.findAllBoutiques = (req, res) => {
    const name = req.query.nom;
    const id = req.query.id;
    const condition = name ? { nom: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idAvatar: { $regex: new RegExp(id), $options: "i" } } : {};
    Boutique.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving taches."
            });
        });
};
// Find a single Avatar with an id
exports.findOneBoutique = (req, res) => {
    const id = req.params.id;
    Boutique.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Avatar with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Avatar with id=" + id });
            throw err;
        });
};
// Update an Avatar by the id in the request
exports.updateBoutique = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Boutique.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tache with id=${id}. Maybe Tache was not found!`
                });
            } else res.send({ message: "Avatar was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Avatar with id=" + id
            });
            throw err;
        });
};
// Delete an Avatar with the specified id in the request
exports.deleteBoutique = (req, res) => {
    const id = req.params.id;
    Boutique.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tache with id=${id}. Maybe Tache was not found!`
                });
            } else {
                res.send({
                    message: "Avatar was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Avatar with id=" + id
            });
            throw err;
        });
};
// Delete all avatars from the database.
exports.deleteAllBoutique = (req, res) => {
    Boutique.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Taches were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all taches."
            });
        });
};