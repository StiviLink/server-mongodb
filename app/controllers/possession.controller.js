const db = require("../models");
const Possession = db.possession;
// Create and Save a new Avatar
exports.createPossession = (req, res) => {
    // Validate request
    if (!req.body.idProduit) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Avatar
    const possession = new Possession({
        idAvatar: req.body.idAvatar,
        idProduit: req.body.idProduit,
        quantite: req.body.quantite,
        duree: req.body.duree ? req.body.duree : -1,
        sac: req.body.sac ? req.body.sac : false
    });
    // Save Avatar in the database
    possession
        .save(possession)
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
exports.findAllPossession = (req, res) => {
    const id = req.query.id;
    const condition = id ? { idAvatar: { $regex: new RegExp(id), $options: "i" } } : {};
    Possession.find(condition)
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
exports.findOnePossession = (req, res) => {
    const id = req.params.id;
    Possession.findById(id)
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
exports.updatePossession = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Possession.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
exports.deletePossession = (req, res) => {
    const id = req.params.id;
    Possession.findByIdAndRemove(id)
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
exports.deleteAllPossession= (req, res) => {
    Possession.deleteMany({})
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
// Find all sacs
exports.findAllSacPossession = (req, res) => {
    Possession.find({ sac: true })
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