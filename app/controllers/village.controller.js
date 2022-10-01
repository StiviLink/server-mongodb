const db = require("../models");
const Village = db.village;
// Create and Save a new Village
exports.createVillage = (req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.idVillage) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a village
    const village = new Village({
        idVillage: req.body.idVillage,
        nom: req.body.nom,
        description: req.body.description ? req.body.description : "~Aucune description~",
        region: req.body.region,
        superficie: req.body.superficie,
        coordonnees: req.body.coordonnees
    });
    // Save Village in the database
    village
        .save(village)
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
// Retrieve all villages from the database.
exports.findAllVillage = (req, res) => {
    const name = req.query.nom;
    const id = req.query.id;
    const condition = name ? { nom: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idVillage: { $regex: new RegExp(id), $options: "i" } } : {};
    Village.find(condition)
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
exports.findOneVillage = (req, res) => {
    const id = req.params.id;
    Village.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Village with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Village with id=" + id });
            throw err;
        });
};
// Update an Avatar by the id in the request
exports.updateVillage = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Village.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tache with id=${id}. Maybe Tache was not found!`
                });
            } else res.send({ message: "Village was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Avatar with id=" + id
            });
            throw err;
        });
};
// Delete an Avatar with the specified id in the request
exports.deleteVillage = (req, res) => {
    const id = req.params.id;
    Village.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete village with id=${id}. Maybe Tache was not found!`
                });
            } else {
                res.send({
                    message: "Village was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Village with id=" + id
            });
            throw err;
        });
};
// Delete all avatars from the database.
exports.deleteAllVillage = (req, res) => {
    Village.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} villages were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all taches."
            });
        });
};