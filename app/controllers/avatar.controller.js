const db = require("../models");
const Avatar = db.avatars;
// Create and Save a new Avatar
exports.createAvatar = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Avatar
    const avatar = new Avatar({
        idAvatar: req.body.idAvatar,
        name: req.body.name,
        description: req.body.description ? req.body.description : "~Aucune description~",
        age: req.body.age,
        histoire: req.body.histoire ? req.body.histoire : "~Aucune histoire~",
        sexe: req.body.sexe,
        race: req.body.race ? req.body.race : "Humain",
        job: req.body.job ? req.body.job : "Aventurier",
        salaire: req.body.salaire ? req.body.salaire : "Récompense de missions",
        classe: req.body.classe ? req.body.classe : "~Aucune Classe~",
        element: req.body.element ? req.body.element : "~Aucun Element~",
        localisation: req.body.localisation ? req.body.localisation : "BASTIA",
        niveau: 1,
        xp: 0,
        telephone: req.body.telephone,
        carte: req.body.carte ? req.body.carte : false,
        pnj: req.body.pnj ? req.body.pnj : false,
        mort: req.body.mort ? req.body.mort : false,
        arme: req.body.arme,
        compte: req.body.compte ? req.body.compte : 20000,
        banque: req.body.banque ? req.body.banque : 0,
        force: req.body.force ? req.body.force : 0,
        magie: req.body.magie ? req.body.magie : 0,
        endurance: req.body.endurance ? req.body.endurance : 0,
        physique: req.body.physique ? req.body.physique : 0,
        magique: req.body.magique ? req.body.magique : 0,
        detente: req.body.detente ? req.body.detente : 0,
        agilite: req.body.agilite ? req.body.agilite : 0,
        intelligence: req.body.intelligence ? req.body.intelligence : 0,
        vitesse: req.body.vitesse ? req.body.vitesse : 0,
        precision: req.body.precision ? req.body.precision : 0,
        portee: req.body.portee ? req.body.portee : 0,
        mental: req.body.mental ? req.body.mental : 0,
        sante: 100,
        energie: 100,
        positionActuelle: {
            quartier : "Garizona",
            lieu : "Auberge"
        },
        positionSuivante: {
            quartier : "",
            lieu : ""
        },
        distance: 0,
        vessie: 0,
        ventre: 0,
        fatigue: 0
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
    const name = req.query.name;
    const id = req.query.id;
    const telephone = req.query.telephone;
    const condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } :
        id ? { idAvatar: { $regex: new RegExp(id), $options: "i" } } :
        telephone ? { telephone: telephone } : {};
    Avatar.find(condition)
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
    Avatar.findById(id)
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
    Avatar.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    Avatar.findByIdAndRemove(id)
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
    Avatar.deleteMany({})
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
// Find all died avatars
exports.findAllDiedAvatars = (req, res) => {
    Avatar.find({ mort: true })
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
// Find all pnj avatars
exports.findAllPnjAvatars = (req, res) => {
    Avatar.find({ pnj: true })
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