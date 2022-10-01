const db = require("../models");
const Technique = db.techniques;
// Create and Save a new Avatar
exports.createTechnique = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Avatar
    const technique = new Technique({
        idAvatar: req.body.idAvatar,
        nom: req.body.nom,
        description: req.body.description ? req.body.description : "~Aucune description~",
        niveauTechnique: req.body.niveauTechnique ? req.body.niveauTechnique : 1,
        elementaire: req.body.elementaire ? req.body.elementaire : false,
        element: req.body.element ? req.body.element : "~Non élémentaire~",
        type: req.body.type ? req.body.type : "Offensive",
        impact: req.body.impact ? req.body.impact : "Impact normal",
        duree: req.body.duree ? req.body.duree : 1,
        energie: req.body.energie ? req.body.energie : 0.5,
        faculte: req.body.faculte ? req.body.faculte : "~Aucune faculté~"
    });
    // Save Avatar in the database
    technique
        .save(technique)
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
exports.findAllTechniques = (req, res) => {
    const name = req.query.nom;
    const id = req.query.id;
    const condition = name ? { nom: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idAvatar: { $regex: new RegExp(id), $options: "i" } } : {};
    Technique.find(condition)
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
exports.findOneTechnique = (req, res) => {
    const id = req.params.id;
    Technique.findById(id)
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
exports.updateTechnique = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Technique.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
exports.deleteTechnique = (req, res) => {
    const id = req.params.id;
    Technique.findByIdAndRemove(id)
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
exports.deleteAllTechnique = (req, res) => {
    Technique.deleteMany({})
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
// Find all magical techniques
exports.findAllMagicTechnique = (req, res) => {
    Technique.find({ elementaire: true })
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