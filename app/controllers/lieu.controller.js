const db = require("../models");
const Lieu = db.lieu;
// Create and Save a new lieu
exports.createLieu = (req, res) => {
    // Validate request
    if (!req.body.nom || !req.body.idLieu) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a quartier
    const lieu = new Lieu({
        idLieu: req.body.idLieu,
        idQuartier: req.body.idQuartier,
        nom: req.body.nom,
        description: req.body.description ? req.body.description : "~Aucune description~",
        region: req.body.region,
        superficie: req.body.superficie,
        coordonnees: req.body.coordonnees
    });
    // Save quartier in the database
    lieu
        .save(lieu)
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
// Retrieve all lieux from the database.
exports.findAllLieux = (req, res) => {
    const name = req.query.nom;
    const id = req.query.id;
    const condition = name ? { nom: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idVillage: { $regex: new RegExp(id), $options: "i" } } : {};
    Lieu.find(condition)
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
// Find a single lieu with an id
exports.findOneLieu = (req, res) => {
    const id = req.params.id;
    Lieu.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found lieu with id " + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving lieu with id=" + id });
            throw err;
        });
};
// Update an Avatar by the id in the request
exports.updateLieu = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Lieu.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update lieu with id=${id}. Maybe lieu was not found!`
                });
            } else res.send({ message: "lieu was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating lieu with id=" + id
            });
            throw err;
        });
};
// Delete an Avatar with the specified id in the request
exports.deleteLieu = (req, res) => {
    const id = req.params.id;
    Lieu.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete lieu with id=${id}. Maybe Tache was not found!`
                });
            } else {
                res.send({
                    message: "Lieu was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete lieu with id=" + id
            });
            throw err;
        });
};
// Delete all avatars from the database.
exports.deleteAllLieux = (req, res) => {
    Lieu.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} lieux were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all lieux."
            });
        });
};