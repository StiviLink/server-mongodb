const db = require("../models");
const AvatarCommunity = db.avatars_community;
// Create and Save a new Avatar
exports.createAvatar = (req, res) => {
    // Create a Avatar
    const avatar = new AvatarCommunity({
        idFiche: req.body.idFiche,
        nom: req.body.nom,
        prenom: req.body.prenom,
        pseudo: req.body.pseudo,
        surnom: req.body.surnom,
        age: req.body.age,
        anniversaire: req.body.anniversaire,
        taille: req.body.taille,
        poids: req.body.poids,
        origine: req.body.origine,
        nationality: req.body.nationality,
        langue: req.body.langue,
        sexe: req.body.sexe,
        profession: req.body.profession,
        url: req.body.url,
        avatar:{
            descriptionPhysique: req.body.descriptionPhysique,
            descriptionMorale: req.body.descriptionMorale,
            verse: req.body.verse,
            statut: req.body.statut,
            rang: req.body.rang,
            bestRang: req.body.bestRang,
            generalRang: req.body.generalRang,
            division: req.body.division,
            victoire: req.body.victoire,
            nul: req.body.nul,
            defaite: req.body.defaite,
            affinite: req.body.affinite,
            armes: req.body.armes,
            mental: req.body.mental,
            agilite: req.body.agilite,
            force: req.body.force,
            intelligence: req.body.intelligence,
            velocite: req.body.velocite,
            sensoriel: req.body.sensoriel
        }
    });
    // Save Avatar in the database
    avatar
        .save(avatar)
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
// Retrieve all avatars from the database.
exports.findAllAvatars = (req, res) => {
    const nom = req.query.nom;
    const id = req.query.id;
    const url = req.query.url;
    const condition = nom ? { nom : { $regex: new RegExp(nom), $options: "i" } } :
        id ? { idFiche: { $regex: new RegExp(id), $options: "i" } } :
            url ? { url: { $regex: new RegExp(url), $options: "i" } }  : {};
    AvatarCommunity.find(condition)
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
exports.findOneAvatar = (req, res) => {
    const id = req.params.id;
    AvatarCommunity.findById(id)
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
exports.updateAvatar = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }
    const id = req.params.id;
    AvatarCommunity.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
exports.deleteAvatar = (req, res) => {
    const id = req.params.id;
    AvatarCommunity.findByIdAndRemove(id)
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
exports.deleteAllAvatars = (req, res) => {
    AvatarCommunity.deleteMany({})
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