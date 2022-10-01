const db = require("../models");
const Produit = db.produits;
// Create and Save a new Avatar
exports.createProduit = (req, res) => {
    // Validate request
    if (!req.body.nom) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Avatar
    const produit = new Produit({
        idProduit: req.body.idProduit,
        idBoutique: req.body.idBoutique,
        idCategory: req.body.idCategory,
        nom: req.body.nom,
        description: req.body.description ? req.body.description : "~Aucune description~",
        prix: req.body.prix,
        duree: req.body.duree ? req.body.duree : -1,
        distance: req.body.distance,
        impact: req.body.impact,
        deplacement: req.body.deplacement,
        sac: req.body.sac,
        contenance: req.body.contenance
    });
    // Save Avatar in the database
    produit
        .save(produit)
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
exports.findAllProduit = (req, res) => {
    const name = req.query.nom;
    const id = req.query.id;
    const condition = name ? { nom: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idProduit: { $regex: new RegExp(id), $options: "i" } } : {};
    Produit.find(condition)
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
exports.findOneProduit = (req, res) => {
    const id = req.params.id;
    Produit.findById(id)
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
exports.updateProduit = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    Produit.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
exports.deleteProduit = (req, res) => {
    const id = req.params.id;
    Produit.findByIdAndRemove(id)
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
exports.deleteAllProduit= (req, res) => {
    Produit.deleteMany({})
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
exports.findAllSacs = (req, res) => {
    Produit.find({ sac: true })
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
// Find many products
exports.findManyProduit = (req, res) => {
    Produit.find({$or:req.body.condition})
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