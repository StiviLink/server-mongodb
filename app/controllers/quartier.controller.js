const db = require("../models");
const Quartier = db.quartier;
// Create and Save a new quartier
exports.createQuartier = (req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.idQuartier) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a quartier
    const quartier = new Quartier({
        idQuartier: req.body.idQuartier,
        idVillage: req.body.idVillage,
        nom: req.body.nom,
        description: req.body.description ? req.body.description : "~Aucune description~",
        region: req.body.region,
        superficie: req.body.superficie,
        coordonnees: req.body.coordonnees
    });
    // Save quartier in the database
    quartier
        .save(quartier)
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
// Retrieve all quartiers from the database.
exports.findAllQuartier = (req, res) => {
    const name = req.query.nom;
    const id = req.query.id;
    const condition = name ? { nom: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idVillage: { $regex: new RegExp(id), $options: "i" } } : {};
    Quartier.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Quartier."
            });
        });
};
// Find a single Quartier with an id
exports.findOneQuartier = (req, res) => {
    const id = req.params.id;
    Quartier.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Quartier with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving Quartier with id=" + id });
            throw err;
        });
};
// Update an Avatar by the id in the request
exports.updateQuartier = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Quartier.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Quartier with id=${id}. Maybe Tache was not found!`
                });
            } else res.send({ message: "Quartier was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Avatar with id=" + id
            });
            throw err;
        });
};
// Delete an Avatar with the specified id in the request
exports.deleteQuartier = (req, res) => {
    const id = req.params.id;
    Quartier.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Quartier with id=${id}. Maybe Tache was not found!`
                });
            } else {
                res.send({
                    message: "Quartier was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Quartier with id=" + id
            });
            throw err;
        });
};
// Delete all avatars from the database.
exports.deleteAllQuartier = (req, res) => {
    Quartier.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Quartiers were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Quartiers."
            });
        });
};